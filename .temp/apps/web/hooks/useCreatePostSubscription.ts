import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useCreatePostSubscription() {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    const queryClient = useQueryClient();
    return useMutation({
        scope: { id: 'post-subscription' },
        mutationFn: (postId: string) => apiClient.organizations.postPostsSubscribe().request(`${scope}`, postId),
        onMutate: (postId) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'post',
                id: postId,
                update: { viewer_has_subscribed: true }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: apiClient.organizations.getMembersMeForMePosts().requestKey({ orgSlug: `${scope}` })
            });
        },
        onError: apiErrorToast
    });
}
