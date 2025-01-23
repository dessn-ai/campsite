import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { handleFollowUpDelete } from "../utils/optimisticFollowUps.ts";
import { apiClient } from "../utils/queryClient.ts";
const deleteFollowUpsById = apiClient.organizations.deleteFollowUpsById();
const getFollowUps = apiClient.organizations.getFollowUps();
export function useDeleteCommentFollowUp() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ id }: {
            commentId: string;
            id: string;
        }) => deleteFollowUpsById.request(`${scope}`, id),
        onMutate({ commentId, id }) {
            return handleFollowUpDelete({
                queryClient,
                queryNormalizer,
                followUpId: id,
                subjectId: commentId,
                subjectType: 'Comment'
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: getFollowUps.requestKey({ orgSlug: `${scope}` }) });
        }
    });
}
