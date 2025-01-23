import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
type Props = {
    postId: string;
};
export function useDeletePoll({ postId }: Props) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: () => apiClient.organizations.deletePostsPoll2().request(`${scope}`, postId),
        onMutate: () => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'post',
                id: postId,
                update: { poll: null }
            });
        }
    });
}
