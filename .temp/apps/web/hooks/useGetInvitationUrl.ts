import { useQuery } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
const query = apiClient.organizations.getInvitationUrl();
export function useGetInvitationUrl() {
    const { scope } = useScope();
    return useQuery({
        queryKey: query.requestKey(`${scope}`),
        queryFn: () => query.request(`${scope}`),
        enabled: !!scope,
        staleTime: Infinity,
        gcTime: Infinity
    });
}
