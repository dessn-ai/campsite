import { useMutation } from '@tanstack/react-query';
import { OrganizationCallRoomsPostRequest } from "../../../packages/types/generated.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
const query = apiClient.organizations.postCallRooms();
export function useCreateCallRoom() {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationCallRoomsPostRequest) => query.request(`${scope}`, data)
    });
}
