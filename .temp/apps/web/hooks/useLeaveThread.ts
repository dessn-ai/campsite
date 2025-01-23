import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { removeFavorite } from "../utils/optimisticFavorites.ts";
import { apiClient, setTypedQueriesData } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
const getThreads = apiClient.organizations.getThreads();
const deleteThreadsMyMembership = apiClient.organizations.deleteThreadsMyMembership();
export function useLeaveThread({ threadId }: {
    threadId: string;
}) {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: (_data: {}) => deleteThreadsMyMembership.request(`${scope}`, threadId),
        onMutate: () => {
            setTypedQueriesData(queryClient, getThreads.requestKey(`${scope}`), (old) => {
                if (!old)
                    return;
                return {
                    ...old,
                    threads: old.threads.filter((thread) => thread.id !== threadId)
                };
            });
            removeFavorite({ queryClient, scope, resourceId: threadId });
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'thread',
                id: threadId,
                update: { viewer_has_favorited: false }
            });
        }
    });
}
