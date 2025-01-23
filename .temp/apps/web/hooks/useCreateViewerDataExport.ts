import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateViewerDataExport() {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (_: null) => apiClient.organizations.postMembersMeDataExport().request(`${scope}`)
    });
}
