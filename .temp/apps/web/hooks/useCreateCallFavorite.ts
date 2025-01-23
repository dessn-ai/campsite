import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Call } from "../../../packages/types/generated.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { insertOptimisticFavorite, removeFavorite, replaceOptimisticFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useCreateCallFavorite() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'favorite' },
        mutationFn: (call: Call) => apiClient.organizations.postCallsFavorite().request(`${scope}`, call.id),
        onMutate: (call) => {
            insertOptimisticFavorite({
                queryClient,
                scope,
                favoritableId: call.id,
                favoritableType: 'Call',
                name: call.title ?? '',
                url: `/${scope}/calls/${call.id}`
            });
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'call',
                id: call.id,
                update: { viewer_has_favorited: true }
            });
        },
        onSuccess: (data, call) => {
            replaceOptimisticFavorite({ queryClient, scope, favoritableId: call.id, data });
        },
        onError(error, call) {
            apiErrorToast(error);
            removeFavorite({ queryClient, scope, resourceId: call.id });
        }
    });
}
