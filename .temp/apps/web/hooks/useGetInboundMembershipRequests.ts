import { useQuery } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
const query = apiClient.organizations.getMembershipRequests();
export function useGetInboundMembershipRequests({ enabled }: {
    enabled?: boolean;
} = { enabled: true }) {
    const { scope } = useScope();
    return useQuery({
        queryKey: query.requestKey({ orgSlug: `${scope}` }),
        queryFn: () => query.request({ orgSlug: `${scope}` }),
        enabled
    });
}
