import { useMutation } from '@tanstack/react-query';
import { OrganizationFeedbacksPostRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
export function useCreateFeedback() {
    const { scope } = useScope();
    return useMutation({
        mutationFn: (data: OrganizationFeedbacksPostRequest) => apiClient.organizations.postFeedback().request(`${scope}`, { ...data })
    });
}
