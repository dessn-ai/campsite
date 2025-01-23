import { useInfiniteQuery } from '@tanstack/react-query';
import { PublicOrganization } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { apiClient } from "../utils/queryClient.ts";
const getPostsTimelineEvents = apiClient.organizations.getPostsTimelineEvents();
interface Props {
    postId: string;
    enabled?: boolean;
    organization?: PublicOrganization;
}
export function useGetPostTimelineEvents({ postId, enabled = true, organization }: Props) {
    const { scope } = useScope();
    const orgSlug = organization?.slug || `${scope}`;
    const result = useInfiniteQuery({
        queryKey: getPostsTimelineEvents.requestKey({ orgSlug, postId }),
        queryFn: ({ pageParam }) => getPostsTimelineEvents.request({
            orgSlug,
            postId,
            after: pageParam,
            limit: 200
        }),
        initialPageParam: undefined as string | undefined,
        enabled: enabled && !!postId,
        getNextPageParam: (lastPage) => lastPage.next_cursor,
        getPreviousPageParam: (firstPage) => firstPage.prev_cursor,
        refetchOnWindowFocus: true
    });
    return {
        ...result,
        total: result.data?.pages?.slice(-1)?.[0]?.total_count
    };
}
