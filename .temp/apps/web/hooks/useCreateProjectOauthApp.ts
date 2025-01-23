import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationsOrgSlugProjectsProjectIdOauthApplicationsPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateProjectOauthApp({ projectId }: {
    projectId: string;
}) {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugProjectsProjectIdOauthApplicationsPostRequest) => apiClient.organizations.postProjectsOauthApplications().request(`${scope}`, `${projectId}`, data),
        onSuccess: () => {
            if (!projectId)
                return;
            queryClient.invalidateQueries({
                queryKey: apiClient.organizations.getProjectsOauthApplications().requestKey(`${scope}`, projectId)
            });
        },
        onError: apiErrorToast
    });
}
