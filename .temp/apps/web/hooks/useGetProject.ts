import { useQuery } from '@tanstack/react-query';
import { PublicOrganization } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { getNormalizedData } from "../utils/queryNormalization.ts";
const query = apiClient.organizations.getProjectsByProjectId();
export function useGetProject({ id, enabled = true, organization }: {
    id?: string;
    enabled?: boolean;
    organization?: PublicOrganization;
}) {
    const { scope } = useScope();
    const orgSlug = organization?.slug || `${scope}`;
    const queryNormalizer = useQueryNormalizer();
    return useQuery({
        queryKey: query.requestKey(orgSlug, `${id}`),
        queryFn: () => query.request(orgSlug, `${id}`),
        enabled: enabled && !!scope && !!id,
        placeholderData: () => getNormalizedData({ queryNormalizer, type: 'project', id: `${id}` })
    });
}
