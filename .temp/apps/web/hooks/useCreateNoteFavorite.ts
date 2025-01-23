import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from "../../../packages/types/generated.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { insertOptimisticFavorite, removeFavorite, replaceOptimisticFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useCreateNoteFavorite() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'favorite' },
        mutationFn: (note: Note) => apiClient.organizations.postNotesFavorite().request(`${scope}`, note.id),
        onMutate: (note) => {
            insertOptimisticFavorite({
                queryClient,
                scope,
                favoritableId: note.id,
                favoritableType: 'Note',
                name: note.title,
                url: `/${scope}/notes/${note.id}`
            });
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'note',
                id: note.id,
                update: { viewer_has_favorited: true }
            });
        },
        onSuccess: (data, note) => {
            replaceOptimisticFavorite({ queryClient, scope, favoritableId: note.id, data });
        },
        onError(error, note) {
            apiErrorToast(error);
            removeFavorite({ queryClient, scope, resourceId: note.id });
        }
    });
}
