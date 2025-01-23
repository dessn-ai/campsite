import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateProjectDataExport() {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (projectId: string) => apiClient.organizations.postProjectsDataExports().request(`${scope}`, projectId)
    });
}
