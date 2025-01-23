import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationPostFollowUpPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { clearNotificationsWithFollowUp, handleFollowUpInsert } from "../utils/optimisticFollowUps.ts";
import { apiClient } from "../utils/queryClient.ts";
const postPostsFollowUp = apiClient.organizations.postPostsFollowUp();
const getFollowUps = apiClient.organizations.getFollowUps();
export function useCreatePostFollowUp() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ postId, ...data }: {
            postId: string;
        } & OrganizationPostFollowUpPostRequest) => postPostsFollowUp.request(`${scope}`, postId, data),
        onMutate({ postId }) {
            clearNotificationsWithFollowUp({
                id: postId,
                type: 'post',
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
