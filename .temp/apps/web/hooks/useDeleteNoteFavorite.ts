import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { removeFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient, setTypedQueriesData } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useDeleteNoteFavorite() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'favorite' },
        mutationFn: (noteId: string) => apiClient.organizations.deleteNotesFavorite().request(`${scope}`, noteId),
        onMutate(noteId: string) {
            return {
                ...removeFavorite({ queryClient, scope, resourceId: noteId }),
                ...createNormalizedOptimisticUpdate({
                    queryNormalizer,
                    type: 'note',
                    id: noteId,
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
