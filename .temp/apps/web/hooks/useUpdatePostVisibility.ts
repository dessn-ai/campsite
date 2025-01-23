import { useMutation } from '@tanstack/react-query';
import { OrganizationsOrgSlugPostsPostIdVisibilityPutRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useUpdatePostVisibility(id: string) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugPostsPostIdVisibilityPutRequest) => apiClient.organizations.putPostsVisibility().request(`${scope}`, id, data),
        onMutate: async (data) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'post',
                id,
                update: data
            });
        }
    });
}
