import { useMutation } from '@tanstack/react-query';
import { OrganizationPostAttachmentsPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateNoteAttachment(id: string) {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationPostAttachmentsPostRequest) => apiClient.organizations.postNotesAttachments().request(`${scope}`, id, data)
    });
}
