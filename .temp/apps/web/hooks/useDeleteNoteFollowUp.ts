import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { handleFollowUpDelete } from "../utils/optimisticFollowUps.ts";
import { apiClient } from "../utils/queryClient.ts";
const deleteFollowUpsById = apiClient.organizations.deleteFollowUpsById();
const getFollowUps = apiClient.organizations.getFollowUps();
export function useDeleteNoteFollowUp() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ id }: {
            noteId: string;
            id: string;
        }) => deleteFollowUpsById.request(`${scope}`, id),
        onMutate({ noteId, id }) {
            return handleFollowUpDelete({
                queryClient,
                queryNormalizer,
                followUpId: id,
                subjectId: noteId,
                subjectType: 'Note'
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: getFollowUps.requestKey({ orgSlug: `${scope}` }) });
        }
    });
}
