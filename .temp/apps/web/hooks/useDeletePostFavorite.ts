import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { removeFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient, setTypedQueriesData } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useDeletePostFavorite() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'favorite' },
        mutationFn: (postId: string) => apiClient.organizations.deletePostsFavorite().request(`${scope}`, postId),
        onMutate(postId) {
            return {
                ...removeFavorite({ queryClient, scope, resourceId: postId }),
                ...createNormalizedOptimisticUpdate({
                    queryNormalizer,
                    type: 'post',
                    id: postId,
                    update: { viewer_has_favorited: false }
                })
            };
        },
        onError(error, _, context) {
            apiErrorToast(error);
            if (context?.removeFavoriteRollbackData) {
                setTypedQueriesData(queryClient, context.removeFavoriteRollbackData.queryKey, context.removeFavoriteRollbackData.data);
            }
        }
    });
}
