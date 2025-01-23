import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FollowUp, PublicOrganization } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { handleFollowUpDelete } from "../utils/optimisticFollowUps.ts";
import { apiClient } from "../utils/queryClient.ts";
const deleteFollowUpsById = apiClient.organizations.deleteFollowUpsById();
const getFollowUps = apiClient.organizations.getFollowUps();
export function useDeleteFollowUp({ organization }: {
    organization?: PublicOrganization;
} = {}) {
    const { scope } = useScope();
    const orgSlug = organization?.slug || `${scope}`;
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: (followUp: FollowUp) => deleteFollowUpsById.request(orgSlug, followUp.id),
        onMutate(followUp: FollowUp) {
            return handleFollowUpDelete({
                queryClient,
                queryNormalizer,
                followUpId: followUp.id,
                subjectId: followUp.subject.id,
                subjectType: followUp.subject.type
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: getFollowUps.requestKey({ orgSlug: `${scope}` }) });
        }
    });
}
