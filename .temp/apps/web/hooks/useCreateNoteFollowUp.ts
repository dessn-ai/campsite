import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationCommentFollowUpPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { clearNotificationsWithFollowUp, handleFollowUpInsert } from "../utils/optimisticFollowUps.ts";
import { apiClient } from "../utils/queryClient.ts";
const postNotesFollowUp = apiClient.organizations.postNotesFollowUp();
const getFollowUps = apiClient.organizations.getFollowUps();
export function useCreateNoteFollowUp() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ noteId, ...data }: {
            noteId: string;
        } & OrganizationCommentFollowUpPostRequest) => postNotesFollowUp.request(`${scope}`, noteId, data),
        onMutate({ noteId }) {
            clearNotificationsWithFollowUp({
                id: noteId,
                type: 'note',
                queryClient
            });
        },
        onSuccess(newFollowUp) {
            handleFollowUpInsert({
                queryClient,
                queryNormalizer,
                followUp: newFollowUp
            });
            queryClient.invalidateQueries({ queryKey: getFollowUps.requestKey({ orgSlug: `${scope}` }) });
        }
    });
}
