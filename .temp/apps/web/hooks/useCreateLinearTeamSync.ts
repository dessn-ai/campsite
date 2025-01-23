import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateLinearTeamSync() {
    const { scope } = useScope();
    return useMutation({
        mutationFn: () => apiClient.organizations.postIntegrationsLinearTeamSyncs().request(`${scope}`)
    });
}
