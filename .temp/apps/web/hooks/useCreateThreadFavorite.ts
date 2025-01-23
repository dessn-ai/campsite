import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageThread } from "../../../packages/types/generated.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { insertOptimisticFavorite, removeFavorite, replaceOptimisticFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
const postThreadsFavorites = apiClient.organizations.postThreadsFavorites();
export function useCreateThreadFavorite() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'favorite' },
        mutationFn: (thread: MessageThread) => postThreadsFavorites.request(`${scope}`, thread.id),
        onMutate: (thread) => {
            insertOptimisticFavorite({
                queryClient,
                scope,
                favoritableId: thread.id,
                favoritableType: 'MessageThread',
                name: thread.title,
                messageThread: thread,
                url: `/${scope}/chat/${thread.id}`
            });
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'thread',
                id: thread.id,
                update: { viewer_has_favorited: true }
            });
        },
        onSuccess: (data, thread) => {
            replaceOptimisticFavorite({ queryClient, scope, favoritableId: thread.id, data });
        },
        onError(error, thread) {
            apiErrorToast(error);
            removeFavorite({ queryClient, scope, resourceId: thread.id });
        }
    });
}
