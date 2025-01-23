import { DropzoneState } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Button, LayeredHotkeys, PicturePlusIcon } from "../../../../packages/ui/src/index.tsx";
import { ComposerGifPicker } from "../Gifs/ComposerGifPicker.tsx";
import { MarkdownEditorRef } from "../MarkdownEditor/index.tsx";
import { PostSchema } from "../Post/schema.ts";
import { ComposerReactionPicker } from "../Reactions/ComposerReactionPicker.tsx";
const ADD_ATTACHMENT_SHORTCUT = 'mod+shift+u';
interface PostComposerInteractiveAttachmentsProps {
    dropzone: DropzoneState;
    editorRef: React.RefObject<MarkdownEditorRef>;
}
export function PostComposerInteractiveAttachments({ dropzone, editorRef }: PostComposerInteractiveAttachmentsProps) {
    const methods = useFormContext<PostSchema>();
    const isSubmitting = methods.formState.isSubmitting;
    return (<div className='flex items-center gap-0.5'>
      <LayeredHotkeys keys={ADD_ATTACHMENT_SHORTCUT} callback={() => {
            if (editorRef.current?.isFocused()) {
                dropzone.open();
            }
        }} options={{ enableOnContentEditable: true, enableOnFormTags: true }}/>

      <Button type='button' disabled={isSubmitting} iconOnly={<PicturePlusIcon />} onClick={() => dropzone?.open()} accessibilityLabel='Add files' variant='plain' tooltip='Add files' tooltipShortcut={ADD_ATTACHMENT_SHORTCUT}/>

      <ComposerReactionPicker editorRef={editorRef} disabled={isSubmitting}/>
      <ComposerGifPicker editorRef={editorRef} disabled={isSubmitting}/>
    </div>);
}
