import { useQuery } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { getNormalizedData } from "../utils/queryNormalization.ts";
type Props = {
    url: string;
};
const getResourceMentions = apiClient.organizations.getResourceMentions();
export function useGetResourceMention({ url }: Props) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useQuery({
        queryKey: getResourceMentions.requestKey({
            orgSlug: `${scope}`,
            url
        }),
        queryFn: () => getResourceMentions.request({
            orgSlug: `${scope}`,
            url
        }),
        enabled: !!url,
        // initialData + infinite staleTime results in never fetching if the mention is cached
        initialData: () => getNormalizedData({ queryNormalizer, type: 'resource_mention', id: url }),
        staleTime: Infinity
    });
}
