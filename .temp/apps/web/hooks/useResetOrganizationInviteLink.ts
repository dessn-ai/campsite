import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { apiClient } from "../utils/queryClient.ts";
export function useResetOrganizationInviteToken() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => apiClient.organizations.patchResetInviteToken().request(`${scope}`),
        onSuccess: () => {
            toast(`Invitation link has been reset.`);
            queryClient.invalidateQueries({ queryKey: apiClient.organizations.getInvitationUrl().requestKey(`${scope}`) });
        },
        onError: apiErrorToast
    });
}
