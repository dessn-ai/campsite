import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { setNormalizedData } from "../utils/queryNormalization.ts";
const postThreadsNotificationForces = apiClient.organizations.postThreadsNotificationForces();
export function useCreateThreadNotificationForce() {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ threadId }: {
            threadId: string;
        }) => postThreadsNotificationForces.request(`${scope}`, threadId),
        onMutate: ({ threadId }) => {
            setNormalizedData({
                queryNormalizer,
                type: 'thread',
                id: threadId,
                update: { viewer_can_force_notification: false }
            });
        }
    });
}
