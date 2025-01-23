import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationsOrgSlugNotesNoteIdPermissionsIdPutRequest } from "../../../packages/types/index.ts";
import { usePusherSocketIdHeader } from "../contexts/pusher.tsx";
import { useScope } from "../contexts/scope.tsx";
import { apiClient, setTypedQueryData } from "../utils/queryClient.ts";
type Props = OrganizationsOrgSlugNotesNoteIdPermissionsIdPutRequest & {
    noteId: string;
    permissionId: string;
};
export function useUpdateNotePermission() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const pusherSocketIdHeader = usePusherSocketIdHeader();
    return useMutation({
        mutationFn: ({ noteId, permissionId, ...data }: Props) => apiClient.organizations
            .putNotesPermissionsById()
            .request(`${scope}`, noteId, permissionId, data, { headers: pusherSocketIdHeader }),
        onMutate({ noteId, permissionId, ...data }) {
            setTypedQueryData(queryClient, apiClient.organizations.getNotesPermissions().requestKey(`${scope}`, noteId), (old) => {
                if (!old)
                    return;
                return old.map((permission) => {
                    if (permission.id === permissionId) {
                        return { ...permission, action: data.permission };
                    }
                    return permission;
                });
            });
        }
    });
}
