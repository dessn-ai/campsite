import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient, setTypedQueryData } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
import { createOptimisticTimelineEvent, insertPostTimelineEvent, useOptimisticTimelineEventMemberActor } from "../utils/timelineEvents/optimistic.ts";
type Props = {
    postId: string;
    projectId: string;
};
const getPostsTimelineEvents = apiClient.organizations.getPostsTimelineEvents();
export function useCreatePostPin() {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    const queryClient = useQueryClient();
    const { member } = useOptimisticTimelineEventMemberActor();
    return useMutation({
        scope: { id: 'update-project-pin' },
        mutationFn: ({ postId }: Props) => apiClient.organizations.postPostsPin().request(`${scope}`, postId),
        onMutate: ({ postId }) => {
            if (member) {
                insertPostTimelineEvent({
                    queryClient,
                    scope,
                    postId,
                    timelineEvent: createOptimisticTimelineEvent({ action: 'subject_pinned', member })
                });
            }
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'post',
                id: postId,
                // immediately add a value so the UI updates. value will be replaced with normalized server response
                update: { project_pin_id: 'tmp-pin-id' }
            });
        },
        onSuccess: (response, { projectId }) => {
            setTypedQueryData(queryClient, apiClient.organizations.getProjectsPins().requestKey(`${scope}`, `${projectId}`), (oldData) => {
                return {
                    ...oldData,
                    data: [...(oldData?.data ?? []), response.pin]
                };
            });
        },
        onError: (_err, { postId }) => {
            queryClient.invalidateQueries({ queryKey: getPostsTimelineEvents.requestKey({ orgSlug: `${scope}`, postId }) });
        }
    });
}
