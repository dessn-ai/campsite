import { useQuery } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { getNormalizedData } from "../utils/queryNormalization.ts";
const getCommentsById = apiClient.organizations.getCommentsById();
export function useGetComment(id: string) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useQuery({
        queryKey: getCommentsById.requestKey(`${scope}`, id),
        queryFn: () => getCommentsById.request(`${scope}`, id),
        placeholderData: () => getNormalizedData({ queryNormalizer, type: 'comment', id }),
        enabled: !!id
    });
}
