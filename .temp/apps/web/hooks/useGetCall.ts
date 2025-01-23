import { useQuery } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { getNormalizedData } from "../utils/queryNormalization.ts";
type Props = {
    id?: string;
    enabled?: boolean;
};
const query = apiClient.organizations.getCallsById();
export function useGetCall({ id, enabled = true }: Props) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useQuery({
        queryKey: query.requestKey(`${scope}`, `${id}`),
        queryFn: () => query.request(`${scope}`, `${id}`),
        enabled: !!id && enabled,
        placeholderData: () => getNormalizedData({ queryNormalizer, type: 'call', id: `${id}` })
    });
}
