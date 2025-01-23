import { useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import toast from 'react-hot-toast';
import { WEB_URL } from "../../../../packages/config/src/index.ts";
import { OrganizationMember, ProjectMembership, SyncOrganizationMember } from "../../../../packages/types/generated.ts";
import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { DropdownMenu } from "../../../../packages/ui/src/DropdownMenu/index.tsx";
import { useCopyToClipboard } from "../../../../packages/ui/src/hooks/index.tsx";
import { DotsHorizontal } from "../../../../packages/ui/src/Icons/index.tsx";
import { buildMenuItems } from "../../../../packages/ui/src/Menu/index.ts";
import { LazyLoadingSpinner } from "../../../../packages/ui/src/Spinner/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
import { IndexPageLoading } from "../IndexPages/components.tsx";
import { DeactivateMemberDialog } from "./DeactivateMemberDialog.tsx";
import { MemberRoleDropdown } from "./MemberRoleDropdown.tsx";
import { PeopleIndexEmptyState } from "./PeopleIndexEmptyState.tsx";
import { PeopleIndexMemberRow } from "./PeopleIndexMemberRow.tsx";
import { ReactivateMemberDialog } from "./ReactivateMemberDialog.tsx";
import { ProjectsManagement } from "../Projects/ProjectsManagement.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useCreateViewerDataExport } from "../../hooks/useCreateViewerDataExport.ts";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser.ts";
import { useGetMemberProjectMemberships } from "../../hooks/useGetMemberProjectMemberships.ts";
import { useIsCommunity } from "../../hooks/useIsCommunity.ts";
import { useListNavigation } from "../../hooks/useListNavigation.ts";
import { useSyncedMembers } from "../../hooks/useSyncedMembers.ts";
import { useUpdateMemberProjectMemberships } from "../../hooks/useUpdateMemberProjectMemberships.ts";
import { useViewerIsAdmin } from "../../hooks/useViewerIsAdmin.ts";
import { getMemberDOMId, roleFilterAtom, rootFilterAtom, searchAtom } from "./PeopleIndex.tsx";
export const PEOPLE_LIST_NAVIGATION_CONTAINER_ID = 'members-list';
export function PeopleList() {
    const rootFilter = useAtomValue(rootFilterAtom);
    const [roleFilter] = useAtom(roleFilterAtom);
    const query = useAtomValue(searchAtom);
    const shouldSearch = rootFilter === 'active';
    const canFilterRole = rootFilter === 'active' && !!roleFilter;
    const { members, isLoading, total } = useSyncedMembers({
        query: shouldSearch ? query : undefined,
        includeDeactivated: rootFilter === 'deactivated' || !!query,
        deactivated: rootFilter === 'deactivated',
        onlyRole: canFilterRole ? roleFilter : undefined
    });
    const hasMembers = !!members?.length;
    const isOnlyMember = total === 1;
    const { selectItem } = useListNavigation({
        items: members || [],
        getItemDOMId: getMemberDOMId
    });
    return (<>
      {isLoading && <IndexPageLoading />}
      {!isLoading && !hasMembers && <PeopleIndexEmptyState />}
      {!isLoading && hasMembers && (<>
          {isOnlyMember && (<div>
              <PeopleIndexEmptyState description='You are the only member of your organization.'/>
            </div>)}
          <ul id={PEOPLE_LIST_NAVIGATION_CONTAINER_ID} className='-mx-2 flex flex-col gap-px'>
            {members.map((member, itemIndex) => (<PeopleIndexMemberRow key={member.id} id={getMemberDOMId(member)} member={member} onFocus={() => selectItem({ itemIndex })} onPointerMove={() => selectItem({ itemIndex, scroll: false })}>
                {member.deactivated ? (<DeactivatedMemberActions member={member}/>) : (<ActiveMemberActions member={member}/>)}
              </PeopleIndexMemberRow>))}
          </ul>
        </>)}
    </>);
}
function ActiveMemberActions({ member }: {
    member: SyncOrganizationMember;
}) {
    return (<div className={cn('flex items-center gap-1'
        // 'opacity-0 group-focus-within:opacity-100 group-has-[button[aria-expanded="true"]]:opacity-100'
        )}>
      <MemberRole member={member}/>
      <OrganizationMemberOverflowMenu member={member}/>
    </div>);
}
function MemberRole({ member }: {
    member: SyncOrganizationMember;
}) {
    const viewerIsAdmin = useViewerIsAdmin();
    const { data: currentUser } = useGetCurrentUser();
    const memberIsViewer = currentUser?.id === member.user.id;
    if (memberIsViewer || !viewerIsAdmin) {
        return (<Button size='sm' variant='plain' disabled className='pointer-events-none'>
        {member.role.slice(0, 1).toUpperCase() + member.role.slice(1)}
      </Button>);
    }
    return <MemberRoleDropdown member={member} value={member.role}/>;
}
export function OrganizationMemberOverflowMenu({ member }: {
    member: SyncOrganizationMember | OrganizationMember;
}) {
    const { scope } = useScope();
    const viewerIsAdmin = useViewerIsAdmin();
    const { data: currentUser } = useGetCurrentUser();
    const memberIsViewer = currentUser?.id === member.user.id;
    const [deactivateDialogIsOpen, setDeactivateDialogIsOpen] = useState(false);
    const [guestDialogIsOpen, setGuestDialogIsOpen] = useState(false);
    const { mutate: createDataExport } = useCreateViewerDataExport();
    const [copy] = useCopyToClipboard();
    function onCopyMemberId() {
        copy(member.id);
        toast('Member ID copied to clipboard');
    }
    function onCopyMemberProfileUrl() {
        copy(`${WEB_URL}/${scope}/people/${member.user.username}`);
        toast('Profile URL copied to clipboard');
    }
    function onCopyMemberEmail() {
        copy(member.user.email);
        toast('Email copied to clipboard');
    }
    function onExportData() {
        createDataExport(null, {
            onSuccess: () => toast('A download link will be emailed to you shortly.')
        });
    }
    const canDeactivate = viewerIsAdmin && !memberIsViewer;
    const canManageSpaceAccess = member.role === 'guest' && viewerIsAdmin;
    const isCommunity = useIsCommunity();
    const items = buildMenuItems([
        canManageSpaceAccess && {
            label: 'Manage channel access',
            type: 'item',
            onSelect: () => setGuestDialogIsOpen(true)
        },
        canManageSpaceAccess && { type: 'separator' },
        !isCommunity && { label: 'Copy email', type: 'item', onSelect: onCopyMemberEmail },
        { label: 'Copy link to profile', type: 'item', onSelect: onCopyMemberProfileUrl },
        { label: 'Copy member ID', type: 'item', onSelect: onCopyMemberId },
        memberIsViewer && { label: 'Export my posts', type: 'item', onSelect: onExportData },
        canDeactivate && { type: 'separator' },
        canDeactivate && {
            label: 'Deactivate',
            type: 'item',
            onSelect: () => setDeactivateDialogIsOpen(true),
            destructive: true
        }
    ]);
    return (<>
      <DeactivateMemberDialog member={member} open={deactivateDialogIsOpen} onOpenChange={setDeactivateDialogIsOpen}/>
      <GuestMemberDialog member={member} open={guestDialogIsOpen} onOpenChange={setGuestDialogIsOpen}/>
      <DropdownMenu align='start' items={items} trigger={<Button iconOnly={<DotsHorizontal />} size='sm' variant='plain' accessibilityLabel='More options'/>}/>
    </>);
}
function DeactivatedMemberActions({ member }: {
    member: SyncOrganizationMember;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const viewerIsAdmin = useViewerIsAdmin();
    if (!viewerIsAdmin)
        return null;
    return (<>
      <ReactivateMemberDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} member={member}/>
      <Button onClick={() => setIsDialogOpen(true)} size='sm' variant='plain' className='opacity-0 group-focus-within:opacity-100'>
        Reactivate
      </Button>
    </>);
}
function GuestMemberDialog({ member, open, onOpenChange }: {
    member: SyncOrganizationMember | OrganizationMember;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, isLoading } = useGetMemberProjectMemberships({
        memberUsername: member.user.username,
        enabled: open
    });
    const memberProjects = data?.data;
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} disableDescribedBy>
      <Dialog.Header>
        <Dialog.Title>Manage {member.user.display_name}’s channel access</Dialog.Title>
      </Dialog.Header>
      {!memberProjects || isLoading ? (<Dialog.Content className='flex items-center justify-center p-2'>
          <LazyLoadingSpinner />
        </Dialog.Content>) : (<InnerGuestMemberDialog member={member} memberProjects={memberProjects} onOpenChange={onOpenChange}/>)}
    </Dialog.Root>);
}
function InnerGuestMemberDialog({ member, memberProjects, onOpenChange }: {
    member: SyncOrganizationMember | OrganizationMember;
    memberProjects: ProjectMembership[];
    onOpenChange: (open: boolean) => void;
}) {
    const [query, setQuery] = useState('');
    const updateMemberProjectMemberships = useUpdateMemberProjectMemberships({ memberUsername: member.user.username });
    const [addedProjectIds, setAddedProjectIds] = useState<Set<string>>(new Set());
    const [removedProjectIds, setRemovedProjectIds] = useState<Set<string>>(new Set());
    const initialProjectIds = useMemo(() => new Set(memberProjects.map((project) => project.project.id)), [memberProjects]);
    function onSave() {
        updateMemberProjectMemberships.mutate({
            add_project_ids: Array.from(addedProjectIds),
            remove_project_ids: Array.from(removedProjectIds)
        }, {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    }
    return (<>
      <ProjectsManagement query={query} setQuery={setQuery} initialProjectIds={initialProjectIds} addedProjectIds={addedProjectIds} onAddedProjectIdsChange={setAddedProjectIds} removedProjectIds={removedProjectIds} onRemovedProjectIdsChange={setRemovedProjectIds}/>
      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => {
            onOpenChange(false);
            setAddedProjectIds(new Set());
            setRemovedProjectIds(new Set());
            setQuery('');
        }}>
            Cancel
          </Button>
          <Button variant='primary' onClick={onSave} disabled={(addedProjectIds.size === 0 && removedProjectIds.size === 0) || updateMemberProjectMemberships.isPending}>
            Save
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </>);
}
