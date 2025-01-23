import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
type Props = {
    projectId: string;
};
export function useCreateProjectView() {
    const { scope } = useScope();
    return useMutation({
        mutationFn: ({ projectId }: Props) => apiClient.organizations.postProjectsViews().request(`${scope}`, projectId)
    });
}
