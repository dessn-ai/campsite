import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
const postProjectsReads = apiClient.organizations.postProjectsReads();
interface Props {
    projectId: string;
}
export function useMarkProjectRead() {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ projectId }: Props) => postProjectsReads.request(`${scope}`, projectId),
        onMutate: async (vars) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'project',
                id: vars.projectId,
                update: { unread_for_viewer: 0 }
            });
        },
        onError: apiErrorToast
    });
}
