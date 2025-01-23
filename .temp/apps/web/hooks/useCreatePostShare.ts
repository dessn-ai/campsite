import { useMutation } from '@tanstack/react-query';
import { OrganizationPostSharesPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreatePostShare(postId: string) {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationPostSharesPostRequest) => apiClient.organizations.postPostsShares().request(`${scope}`, postId, data)
    });
}
