import { useMutation } from '@tanstack/react-query';
import { OrganizationsOrgSlugCallsIdPutRequest } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
export function useUpdateCall({ id }: {
    id: string;
}) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: (data: OrganizationsOrgSlugCallsIdPutRequest) => apiClient.organizations.putCallsById().request(`${scope}`, id, data),
        onMutate: (data) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'call',
                id,
                update: { ...data, processing_generated_title: false, is_edited: true }
            });
        }
    });
}
