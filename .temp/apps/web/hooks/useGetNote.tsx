import { useQuery } from '@tanstack/react-query';
import { PublicOrganization } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { getNormalizedData } from "../utils/queryNormalization.ts";
type Props = {
    id?: string;
    enabled?: boolean;
    organization?: PublicOrganization;
};
const query = apiClient.organizations.getNotesById();
export function useGetNote({ id, enabled = true, organization }: Props) {
    const { scope } = useScope();
    const orgSlug = organization?.slug || `${scope}`;
    const queryNormalizer = useQueryNormalizer();
    return useQuery({
        queryKey: query.requestKey(orgSlug, `${id}`),
        queryFn: () => query.request(orgSlug, `${id}`),
        enabled: enabled && !!id,
        placeholderData: () => getNormalizedData({ queryNormalizer, type: 'note', id: `${id}` })
    });
}
