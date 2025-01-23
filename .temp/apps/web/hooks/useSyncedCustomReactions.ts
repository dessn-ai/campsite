import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { SyncCustomReaction } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { atomWithWebStorage } from "../utils/atomWithWebStorage.ts";
import { apiClient } from "../utils/queryClient.ts";
const syncedCustomReactionsAtom = atomFamily((scope: string) => atomWithWebStorage<SyncCustomReaction[]>(`custom_reactions:sync:${scope}`, []));
const getSyncCustomReactions = apiClient.organizations.getSyncCustomReactions();
export function useSyncedCustomReactions() {
    const { scope } = useScope();
    const [customReactions, setCustomReactions] = useAtom(syncedCustomReactionsAtom(`${scope}`));
    const { refetch } = useQuery({
        queryKey: getSyncCustomReactions.requestKey(`${scope}`),
        queryFn: async () => {
            const results = await getSyncCustomReactions.request(`${scope}`);
            setCustomReactions(results);
            return results;
        },
        enabled: !!scope,
        staleTime: 1000 * 60 * 60 // 1 hour
    });
    return { customReactions, refetch };
}
