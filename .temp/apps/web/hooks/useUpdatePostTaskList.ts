import { useMutation } from '@tanstack/react-query';
import { OrganizationsOrgSlugPostsPostIdTasksPutRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useUpdatePostTaskList(id: string) {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugPostsPostIdTasksPutRequest) => apiClient.organizations.putPostsTasks().request(`${scope}`, id, data)
    });
}
