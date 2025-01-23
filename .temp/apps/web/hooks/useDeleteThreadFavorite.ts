import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { removeFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useDeleteThreadFavorite() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'favorite' },
        mutationFn: (id: string) => apiClient.organizations.deleteThreadsFavorites().request(`${scope}`, id),
        onMutate(id) {
            removeFavorite({ queryClient, scope, resourceId: id });
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'thread',
                id,
                update: { viewer_has_favorited: false }
            });
        },
        onError: apiErrorToast
    });
}
