import { useMutation } from '@tanstack/react-query';
import { OrganizationsOrgSlugProjectsProjectIdDisplayPreferencesPutRequest } from "../../../packages/types/index.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
interface Props extends OrganizationsOrgSlugProjectsProjectIdDisplayPreferencesPutRequest {
    projectId: string;
    orgSlug: string;
}
export function useUpdateProjectDisplayPreference() {
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ orgSlug, projectId, ...data }: Props) => apiClient.organizations.putProjectsDisplayPreferences().request(orgSlug, projectId, data),
        onMutate: ({ orgSlug: _, projectId, ...data }) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'project',
                id: projectId,
                update: { display_preferences: data, viewer_display_preferences: null }
            });
        }
    });
}
