import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Comment } from "../../../../../packages/types/index.ts";
import { draftKey } from "../../../atoms/markdown.ts";
import { useCommentLocalDraft } from "./useCommentLocalDraft.tsx";
import { commentSchema, CommentSchema, getDefaultValues } from "../utils/schema.ts";
export interface CommentFormProps {
    comment?: Comment;
    subjectId: string;
    subjectType: 'post' | 'note';
    replyingToCommentId?: string;
    attachmentId?: string;
    draftKeyOverride?: string;
    initialValues?: Partial<Comment>;
}
export function useCommentForm({ comment, subjectId, replyingToCommentId, attachmentId, draftKeyOverride, initialValues }: CommentFormProps) {
    const draft = useCommentLocalDraft(draftKeyOverride ??
        draftKey({
            postId: subjectId,
            replyingToCommentId,
            attachmentId
        }));
    // if you have a draft canvas comment there's a near-zero chance of opening the composer at the exact same coordinates
    // that are stored in the draft, so we'll prioritize coordinates passed in via initialValues
    const draftWithCurrentCoords = draft
        ? {
            ...draft,
            x: initialValues?.x || draft?.x,
            y: initialValues?.y || draft?.y
        }
        : null;
    const defaultValues = comment ? getDefaultValues(comment) : draftWithCurrentCoords || getDefaultValues(initialValues);
    return useForm<CommentSchema>({ resolver: zodResolver(commentSchema), defaultValues });
}
