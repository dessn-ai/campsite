import { useCallback } from 'react';
import { Comment, SyncCustomReaction } from "../../../../../packages/types/index.ts";
import { useCreateCommentReaction } from "../../../hooks/useCreateCommentReaction.ts";
import { useCreatePostView } from "../../../hooks/useCreatePostView.ts";
import { useDeleteReaction } from "../../../hooks/useDeleteReaction.ts";
import { findGroupedReaction, StandardReaction } from "../../../utils/reactions/index.ts";
export function useCommentHandleReactionSelect({ comment, postId }: {
    comment: Comment;
    postId?: string;
}) {
    const { mutate: createReaction } = useCreateCommentReaction(comment.id);
    const { mutate: deleteReaction } = useDeleteReaction();
    const { mutate: createPostView } = useCreatePostView();
    return useCallback((reaction: StandardReaction | SyncCustomReaction) => {
        if (!comment)
            return;
        const groupedReaction = findGroupedReaction(comment.grouped_reactions, reaction);
        if (groupedReaction?.viewer_reaction_id) {
            deleteReaction({ id: groupedReaction.viewer_reaction_id, type: 'comment', commentId: comment.id });
        }
        else {
            createReaction({ reaction });
            if (postId) {
                createPostView({ postId, read: true });
            }
        }
    }, [comment, deleteReaction, createReaction, postId, createPostView]);
}
