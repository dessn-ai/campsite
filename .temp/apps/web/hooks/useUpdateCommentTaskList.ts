import { useMutation } from '@tanstack/react-query';
import { OrganizationsOrgSlugCommentsCommentIdTasksPutRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useUpdateCommentTaskList(commentId: string) {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugCommentsCommentIdTasksPutRequest) => apiClient.organizations.putCommentsTasks().request(`${scope}`, commentId, data)
    });
}
