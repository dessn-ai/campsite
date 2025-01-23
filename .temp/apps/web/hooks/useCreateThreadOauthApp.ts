import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationsOrgSlugThreadsThreadIdOauthApplicationsPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateThreadOauthApp({ threadId }: {
    threadId: string;
}) {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugThreadsThreadIdOauthApplicationsPostRequest) => apiClient.organizations.postThreadsOauthApplications().request(`${scope}`, `${threadId}`, data),
        onSuccess: () => {
            if (!threadId)
                return;
            queryClient.invalidateQueries({
                queryKey: apiClient.organizations.getThreadsOauthApplications().requestKey(`${scope}`, threadId)
            });
        },
        onError: apiErrorToast
    });
}
