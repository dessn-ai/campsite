import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersMeNotificationPausePostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useGetCurrentUser } from "./useGetCurrentUser.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient, setTypedQueryData } from "../utils/queryClient.ts";
import { setNormalizedData } from "../utils/queryNormalization.ts";
const getMe = apiClient.users.getMe();
const getSyncMembers = apiClient.organizations.getSyncMembers();
export function useCreateNotificationPause() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    const { data: currentUser } = useGetCurrentUser();
    return useMutation({
        mutationFn: (data: UsersMeNotificationPausePostRequest) => apiClient.users.postMeNotificationPause().request(data),
        onMutate: () => {
            setTypedQueryData(queryClient, getMe.requestKey(), (old) => {
                if (!old)
                    return old;
                return { ...old, notifications_paused: true };
            });
            if (!currentUser?.id)
                return;
            setTypedQueryData(queryClient, getSyncMembers.requestKey(`${scope}`), (old) => {
                if (!old)
                    return old;
                return old.map((member) => {
                    if (member.user.id === currentUser.id) {
                        return { ...member, notifications_paused: true };
                    }
                    return member;
                });
            });
            setNormalizedData({
                queryNormalizer,
                type: 'user',
                id: currentUser.id,
                update: { notifications_paused: true }
            });
        }
    });
}
