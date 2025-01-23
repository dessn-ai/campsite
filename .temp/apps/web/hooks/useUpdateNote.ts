import { useMutation } from '@tanstack/react-query';
import { useScope } from "../contexts/scope.tsx";
import { useQueryNormalizer } from "../utils/normy/QueryNormalizerProvider.tsx";
import { apiClient } from "../utils/queryClient.ts";
import { createNormalizedOptimisticUpdate } from "../utils/queryNormalization.ts";
type Props = {
    noteId: string;
    title?: string;
};
export function useUpdateNote() {
    const { scope } = useScope();
    const queryNormalizer = useQueryNormalizer();
    return useMutation({
        mutationFn: ({ noteId, ...data }: Props) => apiClient.organizations.putNotesById().request(`${scope}`, `${noteId}`, data),
        onMutate: async ({ noteId, ...data }) => {
            return createNormalizedOptimisticUpdate({
                queryNormalizer,
                type: 'note',
                id: noteId,
                update: {
                    ...data,
                    last_activity_at: new Date().toISOString()
                }
            });
        }
    });
}
