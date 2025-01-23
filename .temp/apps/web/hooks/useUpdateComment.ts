import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { OrganizationsOrgSlugCommentsIdPutRequest } from "../../../packages/types/index.ts";
import { EMPTY_HTML } from "../atoms/markdown.ts";
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
type Props = OrganizationsOrgSlugCommentsIdPutRequest & {
    commentId: string;
};
export function useUpdateComment(showToast: boolean = true) {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ commentId, ...data }: Props) => apiClient.organizations.putCommentsById().request(`${scope}`, commentId, data),
        onMutate: ({ commentId, ...data }) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'comment',
                id: commentId,
                update: { body_html: data.body_html ?? EMPTY_HTML }
            });
        },
        onSuccess: () => {
            if (showToast) {
                toast('Comment updated');
            }
        }
    });
}
