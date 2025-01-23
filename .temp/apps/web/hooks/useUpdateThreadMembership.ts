import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationsOrgSlugThreadsThreadIdMyMembershipPutRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient, setTypedQueryData } from "../utils/queryClient.ts";
export function useUpdateThreadMembership({ threadId }: {
    threadId: string;
}) {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugThreadsThreadIdMyMembershipPutRequest) => apiClient.organizations.putThreadsMyMembership().request(`${scope}`, threadId, data),
        onMutate: (data) => {
            setTypedQueryData(queryClient, apiClient.organizations.getThreadsMyMembership().requestKey(`${scope}`, threadId), (old) => {
                return !old ? old : { ...old, ...data };
            });
        }
    });
}
