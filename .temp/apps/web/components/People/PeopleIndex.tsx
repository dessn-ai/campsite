import { atom, useAtomValue } from 'jotai';
import { OrganizationInvitation, SyncOrganizationMember } from "../../../../packages/types/index.ts";
import { IndexPageContainer, IndexPageContent } from "../IndexPages/components.tsx";
import { InboundRequests } from "./InboundRequests.tsx";
import { InvitedPeopleList } from "./InvitedPeopleList.tsx";
import { PeopleList } from "./PeopleList.tsx";
import { PeopleSearchFilter } from "./PeopleSearchFilter.tsx";
import { MobilePeopleTitlebar, PeopleTitlebar } from "./PeopleTitlebar.tsx";
const DEFAULT_FILTER = 'active';
export type PeopleIndexFilterType = 'active' | 'invited' | 'deactivated';
export type RoleType = SyncOrganizationMember['role'];
export const rootFilterAtom = atom<PeopleIndexFilterType>(DEFAULT_FILTER);
export const searchAtom = atom<string>('');
export const roleFilterAtom = atom<RoleType | undefined>(undefined);
export function PeopleIndex() {
    const rootFilter = useAtomValue(rootFilterAtom);
    return (<IndexPageContainer>
      <PeopleTitlebar />
      <MobilePeopleTitlebar />
      <PeopleSearchFilter />

      <IndexPageContent className='max-w-3xl'>
        <InboundRequests />

        {(rootFilter === 'active' || rootFilter === 'deactivated') && <PeopleList />}
        {rootFilter == 'invited' && <InvitedPeopleList />}
      </IndexPageContent>
    </IndexPageContainer>);
}
export function getMemberDOMId(member: SyncOrganizationMember) {
    return `organization-member-${member.id}`;
}
export function getInvitationDOMId(invitation: OrganizationInvitation) {
    return `organization-invitation-${invitation.id}`;
}
