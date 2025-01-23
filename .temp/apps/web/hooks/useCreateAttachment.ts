import { useMutation } from '@tanstack/react-query';
import { OrganizationAttachmentsPostRequest } from "../../../packages/types/index.ts";
import { usePusherSocketIdHeader } from "../contexts/pusher.tsx";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateAttachment() {
    const { scope } = useScope();
    const headers = usePusherSocketIdHeader();
    return useMutation({
        mutationFn: (data: OrganizationAttachmentsPostRequest) => apiClient.organizations.postAttachments().request(`${scope}`, data, { headers })
    });
}
