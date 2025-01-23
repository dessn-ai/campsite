import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersMePreferencePutRequest } from "../../../packages/types/index.ts";
import { apiClient, setTypedQueryData } from "../utils/queryClient.ts";
export function useUpdatePreference() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UsersMePreferencePutRequest) => apiClient.users.putMePreference().request(data),
        onMutate: (data: UsersMePreferencePutRequest) => {
            setTypedQueryData(queryClient, apiClient.users.getMe().requestKey(), (old) => {
                if (!old)
                    return;
                const newData = {
                    ...old,
                    preferences: {
                        ...old.preferences,
                        [data.preference]: data.value
                    }
                };
                return newData;
            });
        }
    });
}
