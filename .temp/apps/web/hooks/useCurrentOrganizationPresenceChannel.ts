import { atom, useSetAtom } from 'jotai';
import { useGetCurrentOrganization } from "./useGetCurrentOrganization.ts";
import { useIsOrganizationMember } from "./useIsOrganizationMember.ts";
import { useUsersPresence } from "./useUsersPresence.ts";
export const presentUserIdsAtom = atom(new Set<string>());
export function OrganizationUserPresenceSubscription() {
    const isOrgMember = useIsOrganizationMember();
    const { data: organization } = useGetCurrentOrganization({ enabled: isOrgMember });
    const setUserIds = useSetAtom(presentUserIdsAtom);
    useUsersPresence({ channelName: organization?.presence_channel_name, setUserIds });
    return null;
}
