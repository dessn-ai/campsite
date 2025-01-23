import { useMutation } from '@tanstack/react-query';
import { OrganizationFigmaFileAttachmentDetailsPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateFigmaFileAttachment() {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationFigmaFileAttachmentDetailsPostRequest) => apiClient.organizations.postFigmaFileAttachmentDetails().request(`${scope}`, data)
    });
}
