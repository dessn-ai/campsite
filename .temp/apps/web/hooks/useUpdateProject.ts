import { useMutation } from '@tanstack/react-query';
import { OrganizationsOrgSlugProjectsProjectIdPutRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { apiClient } from "../utils/queryClient.ts";
const query = apiClient.organizations.putProjectsByProjectId();
export function useUpdateProject(id: string) {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugProjectsProjectIdPutRequest) => query.request(`${scope}`, id, data),
        onError: apiErrorToast
    });
}
