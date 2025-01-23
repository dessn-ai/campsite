import { ComponentProps, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import deepEqual from 'fast-deep-equal';
import { atomFamily } from 'jotai/utils';
import { useFormContext } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';
import { getMarkdownExtensions } from "../../../../packages/editor/src/markdown.ts";
import { Comment } from "../../../../packages/types/index.ts";
import { Avatar, Button, LayeredHotkeys, PicturePlusIcon, UIText, useFocusWithin } from "../../../../packages/ui/src/index.tsx";
import { cn, isMetaEnter } from "../../../../packages/ui/src/utils/index.ts";
import { EMPTY_HTML, draftKey as generateDraftKey } from "../../atoms/markdown.ts";
import { CommentInnerLayoutTransitionContainer } from "./CommentLayoutTransitionContainer.tsx";
import { CommentFormProps } from "./hooks/useCommentForm.tsx";
import { CommentSchema, getDefaultValues } from "./utils/schema.ts";
import { ComposerGifPicker } from "../Gifs/ComposerGifPicker.tsx";
import MarkdownEditor, { MarkdownEditorRef } from "../MarkdownEditor/index.tsx";
import { useFormSetValue } from "../PostComposer/hooks/useFormSetValue.tsx";
import { RichTextRenderer } from "../RichTextRenderer/index.tsx";
import { useCreateComment } from "../../hooks/useCreateComment.ts";
import { useCreateCommentReply } from "../../hooks/useCreateCommentReply.tsx";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser.ts";
import { useMergeRefs } from "../../hooks/useMergeRefs.ts";
import { useSaveCommentFormDraft } from "../../hooks/useSaveCommentFormDraft.ts";
import { useUpdateComment } from "../../hooks/useUpdateComment.ts";
import { useUploadHelpers } from "../../hooks/useUploadHelpers.ts";
import { atomWithWebStorage } from "../../utils/atomWithWebStorage.ts";
import { hasOptimisticAttachments } from "../../utils/createFileUploadPipeline.ts";
import { trimHtml } from "../../utils/trimHtml.ts";
import { ComposerReactionPicker } from "../Reactions/ComposerReactionPicker.tsx";
import { CommentDiscardDraftDialog } from "./CommentDiscardDraftDialog.tsx";
export const commentDraftAtom = atomFamily((key: string) => atomWithWebStorage<string | CommentSchema | null>(key, null), deepEqual);
export function commentComposerId(subjectId: string, replyingToCommentId?: string) {
    if (replyingToCommentId)
        return `comment-composer-${subjectId}-${replyingToCommentId}`;
    return `comment-composer-${subjectId}`;
}
const ADD_ATTACHMENT_SHORTCUT = 'mod+shift+u';
export interface CommentComposerProps extends CommentFormProps, Pick<ComponentProps<typeof MarkdownEditor>, 'defaultMentions'> {
    open?: boolean;
    onOptimisticCreate?(): void;
    onCreated?: (response: Comment) => void;
    onSubmitting?: () => void;
    closeComposer?: () => void;
    onEmptyChange?: (isEmpty: boolean) => void;
    autoFocus?: boolean | 'end' | 'start';
    display?: 'block' | 'inline' | 'inline-refresh' | 'inline-edit';
    maxHeight?: string;
    placeholder?: string;
    commentMetadata?: {
        x: number;
        y: number;
    };
    noteHighlight?: string;
    attachmentId?: string;
    draftKeyOverride?: string;
    isEditing?: boolean;
    disabled?: boolean;
    lazyLoadMarkdownEditor?: boolean;
}
export function CommentComposer({ subjectId, subjectType, comment, open = true, replyingToCommentId, closeComposer, onOptimisticCreate, onCreated, onEmptyChange, onSubmitting, autoFocus = false, display = 'block', placeholder = 'Write a comment...', attachmentId, draftKeyOverride, defaultMentions, isEditing = false, noteHighlight, maxHeight, disabled = false, lazyLoadMarkdownEditor = false }: CommentComposerProps) {
    const setValue = useFormSetValue<CommentSchema>();
    const { reset: methodsReset, handleSubmit, getValues, watch } = useFormContext<CommentSchema>();
    const { data: currentUser } = useGetCurrentUser();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isComposerEmpty, setIsComposerEmpty] = useState(() => getValues('body_html') === EMPTY_HTML);
    const [isReactionPickerOpen, setIsReactionPickerOpen] = useState(false);
    const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
    const [debouncedIsReactionPickerOpen] = useDebounce(isReactionPickerOpen, 100);
    const [debouncedIsGifPickerOpen] = useDebounce(isGifPickerOpen, 100);
    const [inViewContainerRef, containerInView] = useInView({ triggerOnce: true });
    const containerRef = useRef<HTMLFormElement>(null);
    const { ref: focusWithinContainerRef, isFocusedWithin } = useFocusWithin();
    const setContainerRefs = useMergeRefs(containerRef, focusWithinContainerRef, inViewContainerRef);
    const bubbleMenuContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<MarkdownEditorRef>(null);
    const editorId = commentComposerId(subjectId, replyingToCommentId);
    const draftKey = draftKeyOverride || generateDraftKey({ postId: subjectId, replyingToCommentId, attachmentId });
    const { removeDraft } = useSaveCommentFormDraft({
        enabled: true,
        draftKey
    });
    const attachmentsIds = watch('attachment_ids');
    const { dropzone } = useUploadHelpers({
        upload: editorRef.current?.uploadAndAppendAttachments
    });
    const reset = useCallback(() => {
        editorRef.current?.clearAndBlur();
        // resetting to a stored draft would restore to non-empty values. reset to a blank default.
        methodsReset(getDefaultValues(undefined));
        setIsComposerEmpty(true);
        removeDraft();
    }, [methodsReset, removeDraft]);
    const { mutate: createComment } = useCreateComment({
        subjectId,
        subjectType,
        onOptimisticCreate,
        onServerCreate: onCreated
    });
    const { mutate: createReply } = useCreateCommentReply({
        subjectId,
        subjectType,
        onOptimisticCreate,
        onServerCreate: onCreated
    });
    const { mutate: updateComment } = useUpdateComment();
    const canSubmit = (!isComposerEmpty || !disabled || attachmentsIds.length > 0) && !hasOptimisticAttachments(attachmentsIds);
    const shouldHideControls = display === 'inline-refresh' &&
        isComposerEmpty &&
        !isFocusedWithin &&
        !dropzone.isFileDialogActive &&
        !isReactionPickerOpen &&
        !isGifPickerOpen &&
        // use debounced values to account to account for focus management between trigger and portalled content
        !debouncedIsReactionPickerOpen &&
        !debouncedIsGifPickerOpen;
    const onSubmit = handleSubmit(async (data) => {
        const editorHTML = editorRef.current?.getHTML() ?? EMPTY_HTML;
        if (!canSubmit || trimHtml(editorHTML) === '')
            return;
        setIsComposerEmpty(true);
        setIsSubmitted(true);
        const createData = {
            ...data,
            body_html: editorHTML ?? EMPTY_HTML,
            file_id: attachmentId,
            note_highlight: noteHighlight,
            // keeping these to minimize PR size; will remove later
            attachments: [],
            transformedFiles: []
        };
        const onError = () => {
            setIsSubmitted(false);
        };
        reset();
        onSubmitting?.();
        if (comment) {
            updateComment({ commentId: comment.id, ...createData });
        }
        else if (replyingToCommentId) {
            createReply({ parentCommentId: replyingToCommentId, ...createData }, { onError });
        }
        else {
            createComment(createData, { onError });
        }
    });
    useEffect(() => {
        onEmptyChange?.(isComposerEmpty);
    }, [isComposerEmpty, onEmptyChange]);
    function scrollContainerIntoView() {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function handleCommandEnter(event: KeyboardEvent<HTMLFormElement>) {
        if (isMetaEnter(event)) {
            onSubmit(event);
        }
    }
    function clearDraftAndClose() {
        reset();
        closeComposer?.();
    }
    if (!open)
        return null;
    return (<form ref={setContainerRefs} onKeyDownCapture={handleCommandEnter} onSubmit={onSubmit} className={cn('relative isolate flex flex-1 scroll-m-2', {
            'gap-3 p-3': display === 'inline-refresh'
        })}>
      <LayeredHotkeys keys={ADD_ATTACHMENT_SHORTCUT} callback={() => {
            if (editorRef.current?.isFocused()) {
                dropzone.open();
            }
        }} options={{ enableOnContentEditable: true, enableOnFormTags: true }}/>

      {display === 'inline-refresh' && (<Avatar urls={currentUser?.avatar_urls} size='sm' rounded='rounded-full' name={currentUser?.display_name}/>)}

      <div className={cn('relative flex min-w-0 flex-1 flex-col', {
            'bg-elevated rounded-lg border shadow-sm': display === 'block'
        })}>
        <input {...dropzone.getInputProps()}/>

        <div ref={bubbleMenuContainerRef}>
          <div id={editorId} style={{ maxHeight }} className={cn('relative', {
            'min-h-[48px]': display === 'block',
            'overflow-y-auto': maxHeight
        })}>
            {lazyLoadMarkdownEditor && !containerInView ? (<CommentComposerLazyPlaceholder content={getValues('body_html')}/>) : (<MarkdownEditor ref={editorRef} placeholder={placeholder} content={getValues('body_html')} onChangeDebounced={(html) => setValue('body_html', html)} onEmptyDidChange={setIsComposerEmpty} onClick={() => setIsSubmitted(false)} onFocus={isEditing ? scrollContainerIntoView : undefined} autoFocus={autoFocus} isSubmitted={isSubmitted} enableInlineAttachments enableInlineLinks enableSyntaxHighlighting defaultMentions={defaultMentions} appendBubbleMenuTo={() => bubbleMenuContainerRef.current} minHeight={display === 'block' ? undefined : 'none'} onInlineAttachmentsChange={(attachments) => setValue('attachment_ids', Array.from(attachments))} containerClasses={display === 'inline-refresh' || display === 'inline-edit' ? 'p-0 overflow-visible' : undefined}/>)}
          </div>
        </div>

        <CommentInnerLayoutTransitionContainer initial={false} show={!shouldHideControls}>
          <div className={cn('flex items-center justify-between', {
            'p-3 pt-1': display === 'inline',
            'p-3 pt-2': display === 'block',
            '-ml-1.5 pt-3': display === 'inline-refresh' || display === 'inline-edit'
        })}>
            <div className='flex gap-0.5'>
              <Button variant='plain' iconOnly={<PicturePlusIcon />} accessibilityLabel='Add files' onClick={dropzone.open} tooltip='Add files' tooltipShortcut={ADD_ATTACHMENT_SHORTCUT}/>
              <ComposerReactionPicker editorRef={editorRef} open={isReactionPickerOpen} onOpenChange={setIsReactionPickerOpen}/>
              <ComposerGifPicker editorRef={editorRef} open={isGifPickerOpen} onOpenChange={setIsGifPickerOpen}/>
            </div>

            <div className='flex gap-2'>
              {(closeComposer || display === 'inline-refresh') && (<CommentDiscardDraftDialog onDiscard={clearDraftAndClose} enabled={!isComposerEmpty}/>)}
              <Button disabled={!canSubmit} variant='primary' type='submit' onClick={onSubmit} tooltip={isEditing ? 'Save changes' : replyingToCommentId ? 'Create reply' : 'Create comment'} tooltipShortcut='mod+enter'>
                {isEditing ? 'Save' : replyingToCommentId ? 'Reply' : 'Comment'}
              </Button>
            </div>
          </div>
        </CommentInnerLayoutTransitionContainer>
      </div>
    </form>);
}
function CommentComposerLazyPlaceholder({ content }: {
    content?: string;
}) {
    const extensions = useMemo(() => getMarkdownExtensions({ linkUnfurl: {} }), []);
    if (content && content !== EMPTY_HTML) {
        return (<div className='prose select-text'>
        <RichTextRenderer content={content} extensions={extensions}/>
      </div>);
    }
    return (<UIText quaternary className='cursor-text text-[15px]'>
      Write a reply
    </UIText>);
}
