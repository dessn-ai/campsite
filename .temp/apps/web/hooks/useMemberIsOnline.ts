import { useAtomValue } from 'jotai';
import { presentUserIdsAtom } from "./useCurrentOrganizationPresenceChannel.ts";
export function useUserIsOnline(userId?: string) {
    const onlineUserIds = useAtomValue(presentUserIdsAtom);
    return !!userId && onlineUserIds.has(userId);
}
