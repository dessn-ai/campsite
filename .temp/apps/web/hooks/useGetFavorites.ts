import { useQuery } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
const getFavorites = apiClient.organizations.getFavorites();
export function useGetFavorites() {
    const { scope } = useScope();
    return useQuery({
        queryKey: getFavorites.requestKey(`${scope}`),
        queryFn: () => getFavorites.request(`${scope}`)
    });
}
