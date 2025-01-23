import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useDeleteProjectSubscription(projectId: string) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'update-project-subscription' },
        mutationFn: () => apiClient.organizations.deleteProjectsSubscription().request(`${scope}`, projectId),
        onMutate: () => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'project',
                id: projectId,
                update: { viewer_has_subscribed: false, viewer_subscription: 'none' }
            });
        }
    });
}
