import { useMutation } from '@tanstack/react-query';
import { useWebPush } from "../contexts/WebPush.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { apiClient, signinUrl } from "../utils/queryClient.ts";
import { safeSetAppBadge } from "../utils/setAppBadge.ts";
export function useSignoutUser() {
    const { unsubscribe } = useWebPush();
    return useMutation({
        mutationFn: async () => {
            await unsubscribe();
            safeSetAppBadge(0);
            return apiClient.users.deleteMeSignOut().request();
        },
        onSuccess: () => {
            window.location.href = signinUrl();
        },
        onError: apiErrorToast
    });
}
