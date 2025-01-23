import { useMutation } from '@tanstack/react-query';
import { OrganizationsOrgSlugNotesNoteIdVisibilityPutRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
type Props = OrganizationsOrgSlugNotesNoteIdVisibilityPutRequest & {
    noteId: string;
};
export function useUpdateNoteVisibility() {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ noteId, ...data }: Props) => apiClient.organizations.putNotesVisibility().request(`${scope}`, `${noteId}`, data),
        onMutate: ({ noteId, visibility }) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'note',
                id: noteId,
                update: { public_visibility: visibility === 'public' }
            });
        }
    });
}
