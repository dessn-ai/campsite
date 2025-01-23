import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeGroupedReactionByEmoji } from "../helpers/groupedReactions.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient, getTypedQueryData, setTypedInfiniteQueriesData } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
import { pendingReactionMutations } from "../utils/reactions/mutations.ts";
const deleteReactions = apiClient.organizations.deleteReactions();
type Props = {
    type: 'post';
    id: string;
    postId: string;
} | {
    type: 'comment';
    id: string;
    commentId: string;
} | {
    type: 'message';
    id: string;
    threadId: string;
    messageId: string;
};
export function useDeleteReaction() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'reaction' },
        mutationFn: async ({ id: _id }: Props) => {
            const id = (await pendingReactionMutations.get(_id)?.promise) ?? _id;
            return deleteReactions.request(`${scope}`, { id });
        },
        onMutate: ({ id: reaction_id, ...props }) => {
            const currentUser = getTypedQueryData(queryClient, apiClient.users.getMe().requestKey());
            if (!currentUser)
                return;
            switch (props.type) {
                case 'post':
                    return createNormalizedOptimisticUpdate({
                        queryNormalizer,
                        type: 'post',
                        id: props.postId,
                        update: (old) => ({
                            grouped_reactions: removeGroupedReactionByEmoji({
                                grouped_reactions: old.grouped_reactions,
                                reaction_id,
                                display_name: currentUser.display_name
                            })
                        })
                    });
                case 'comment':
                    return createNormalizedOptimisticUpdate({
                        queryNormalizer,
                        type: 'comment',
                        id: props.commentId,
                        update: (old) => ({
                            grouped_reactions: removeGroupedReactionByEmoji({
                                grouped_reactions: old.grouped_reactions,
                                reaction_id,
                                display_name: currentUser.display_name
                            })
                        })
                    });
                case 'message':
                    setTypedInfiniteQueriesData(queryClient, apiClient.organizations.getThreadsMessages().requestKey({ orgSlug: `${scope}`, threadId: props.threadId }), (old) => {
                        if (!old)
                            return;
                        return {
                            ...old,
                            pages: old.pages.map((page) => ({
                                ...page,
                                data: page.data.map((message) => {
                                    if (message.id !== props.messageId)
                                        return message;
                                    return {
                                        ...message,
                                        grouped_reactions: removeGroupedReactionByEmoji({
                                            grouped_reactions: message.grouped_reactions,
                                            reaction_id,
                                            display_name: currentUser.display_name
                                        })
                                    };
                                })
                            }))
                        };
                    });
                    break;
            }
        }
    });
}
