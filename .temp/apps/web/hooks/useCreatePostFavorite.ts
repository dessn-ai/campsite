import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from "../../../packages/types/generated.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { insertOptimisticFavorite, removeFavorite, replaceOptimisticFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useCreatePostFavorite() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'favorite' },
        mutationFn: (post: Post) => apiClient.organizations.postPostsFavorite().request(`${scope}`, post.id),
        onMutate: (post) => {
            insertOptimisticFavorite({
                queryClient,
                scope,
                favoritableId: post.id,
                favoritableType: 'Post',
                name: post.title || post.truncated_description_text,
                url: `/${scope}/posts/${post.id}`
            });
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'post',
                id: post.id,
                update: { viewer_has_favorited: true }
            });
        },
        onSuccess: (data, post) => {
            replaceOptimisticFavorite({ queryClient, scope, favoritableId: post.id, data });
        },
        onError(error, post) {
            apiErrorToast(error);
            removeFavorite({ queryClient, scope, resourceId: post.id });
        }
    });
}
