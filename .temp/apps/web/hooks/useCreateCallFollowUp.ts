import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationCallFollowUpPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { clearNotificationsWithFollowUp, handleFollowUpInsert } from "../utils/optimisticFollowUps.ts";
import { apiClient } from "../utils/queryClient.ts";
const postCallsFollowUp = apiClient.organizations.postCallsFollowUp();
const getFollowUps = apiClient.organizations.getFollowUps();
export function useCreateCallFollowUp() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ callId, ...data }: {
            callId: string;
        } & OrganizationCallFollowUpPostRequest) => postCallsFollowUp.request(`${scope}`, callId, data),
        onMutate({ callId }) {
            clearNotificationsWithFollowUp({
                id: callId,
                type: 'call',
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
