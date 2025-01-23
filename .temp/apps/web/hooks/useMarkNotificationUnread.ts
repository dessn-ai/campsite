import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PublicOrganization } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { optimisticMarkNotificationRead } from "./useMarkNotificationRead.ts";
export function useMarkNotificationUnread({ organization }: {
    organization?: PublicOrganization;
} = {}) {
    const { scope } = useScope();
    const orgSlug = organization?.slug || `${scope}`;
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => apiClient.organizations.deleteMembersMeNotificationsRead().request(orgSlug, id),
        onMutate: async (id) => {
            await Promise.all([
                queryClient.cancelQueries({ queryKey: apiClient.users.getMeNotificationsUnreadAllCount().requestKey() }),
                optimisticMarkNotificationRead(id, queryClient, false)
            ]);
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: apiClient.users.getMeNotificationsUnreadAllCount().requestKey() });
        }
    });
}
