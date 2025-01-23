import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationCommentFollowUpPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { clearNotificationsWithFollowUp, handleFollowUpInsert } from "../utils/optimisticFollowUps.ts";
import { apiClient } from "../utils/queryClient.ts";
const postCommentsFollowUp = apiClient.organizations.postCommentsFollowUp();
const getFollowUps = apiClient.organizations.getFollowUps();
export function useCreateCommentFollowUp() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ commentId, ...data }: {
            commentId: string;
        } & OrganizationCommentFollowUpPostRequest) => postCommentsFollowUp.request(`${scope}`, commentId, data),
        onMutate({ commentId }) {
            clearNotificationsWithFollowUp({
                id: commentId,
                type: 'comment',
                queryClient
            });
        },
        onSuccess(newFollowUp) {
            handleFollowUpInsert({
                queryClient,
                queryNormalizer,
                followUp: newFollowUp
            });
            queryClient.invalidateQueries({ queryKey: getFollowUps.requestKey({ orgSlug: `${scope}` }) });
        }
    });
}
