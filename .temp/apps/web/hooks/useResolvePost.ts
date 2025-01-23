import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationsOrgSlugPostsPostIdResolutionPostRequest } from "../../../packages/types/index.ts";
import { usePusherSocketIdHeader } from "../contexts/pusher.tsx";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createOptimisticTimelineEvent, insertPostTimelineEvent, useOptimisticTimelineEventMemberActor } from "../utils/timelineEvents/optimistic.ts";
const postPostsResolution = apiClient.organizations.postPostsResolution();
type Props = OrganizationsOrgSlugPostsPostIdResolutionPostRequest & {
    postId: string;
};
export function useResolvePost() {
    const { scope } = useScope();
    const queryClient = useQueryClient();
    const headers = usePusherSocketIdHeader();
    const { member } = useOptimisticTimelineEventMemberActor();
    return useMutation({
        mutationFn: ({ postId, ...data }: Props) => postPostsResolution.request(`${scope}`, postId, data, { headers }),
        onSuccess: (_, { postId }) => {
            if (!member)
                return;
            insertPostTimelineEvent({
                queryClient,
                scope,
                postId,
                timelineEvent: createOptimisticTimelineEvent({ action: 'post_resolved', member })
            });
        }
    });
}
