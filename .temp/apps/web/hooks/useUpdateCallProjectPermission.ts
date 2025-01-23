import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationsOrgSlugCallsCallIdProjectPermissionPutRequest } from "../../../packages/types/generated.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient, getTypedQueryData } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
const getSyncProjects = apiClient.organizations.getSyncProjects();
const getFollowUps = apiClient.organizations.getFollowUps();
interface Props extends OrganizationsOrgSlugCallsCallIdProjectPermissionPutRequest {
    callId: string;
}
export function useUpdateCallProjectPermission() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        scope: { id: 'update-project-permission' },
        mutationFn: ({ callId, ...data }: Props) => apiClient.organizations.putCallsProjectPermission().request(`${scope}`, callId, data),
        onMutate: ({ callId, ...data }) => {
            const syncProjects = getTypedQueryData(queryClient, getSyncProjects.requestKey(`${scope}`));
            const project = syncProjects?.find((p) => p.id === data.project_id);
            // TODO: Update getProjectPins cache when call pins implemented.
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'call',
                id: callId,
                update: {
                    project_permission: data.permission,
                    project
                    // TODO: Update project_pin_id when call pins implemented.
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getFollowUps.requestKey({ orgSlug: `${scope}` }) });
        }
    });
}
