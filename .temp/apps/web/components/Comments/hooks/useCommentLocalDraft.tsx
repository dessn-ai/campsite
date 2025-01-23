import { useAtomValue } from 'jotai';
import { commentDraftAtom } from "../CommentComposer.tsx";
import { commentDefaultValues, CommentSchema } from "../utils/schema.ts";
/**
 * Handles our migration from storing just body_html to storing the full comment form schema.
 */
export function useCommentLocalDraft(draftKey: string): CommentSchema | null {
    const content = useAtomValue(commentDraftAtom(draftKey));
    if (!content)
        return null;
    if (typeof content === 'string') {
        return { ...commentDefaultValues, body_html: content };
    }
    return content;
}
