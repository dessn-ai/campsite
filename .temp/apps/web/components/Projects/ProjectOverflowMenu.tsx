import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Project } from "../../../../packages/types/index.ts";
import { AppsIcon, ArchiveIcon, BellCheckIcon, BellIcon, Button, CheckSquareIcon, CirclePlusIcon, ContextMenu, CopyIcon, DotsHorizontal, DownloadIcon, LinkIcon, LogOutIcon, PencilIcon, StarFilledIcon, StarOutlineIcon, TrashIcon, UnreadSquareBadgeIcon } from "../../../../packages/ui/src/index.tsx";
import { DropdownMenu } from "../../../../packages/ui/src/DropdownMenu/index.tsx";
import { buildMenuItems } from "../../../../packages/ui/src/Menu/index.ts";
import { useCopyToClipboard } from "../../../../packages/ui/src/hooks/index.tsx";
import { ProjectArchiveDialog } from "./ProjectDialogs/ProjectArchiveDialog.tsx";
import { ProjectDeleteDialog } from "./ProjectDialogs/ProjectDeleteDialog.tsx";
import { ProjectEditDialog } from "./ProjectDialogs/ProjectEditDialog.tsx";
import { ProjectIntegrationsDialog } from "./ProjectDialogs/ProjectIntegrationsDialog.tsx";
import { ProjectNotificationsDialog } from "./ProjectDialogs/ProjectNotificationsDialog.tsx";
import { ProjectRemoveLastPrivateProjectMembershipDialog } from "./ProjectDialogs/ProjectRemoveLastPrivateProjectMembershipDialog.tsx";
import { ProjectRemoveMembershipDialog } from "./ProjectDialogs/ProjectRemoveMembershipDialog.tsx";
import { ThreadNotificationsSettingsDialog } from "../Thread/ThreadNotificationsSettingsDialog.tsx";
import { useCreateProjectDataExport } from "../../hooks/useCreateProjectDataExport.ts";
import { useCreateProjectFavorite } from "../../hooks/useCreateProjectFavorite.ts";
import { useCreateProjectMembership } from "../../hooks/useCreateProjectMembership.ts";
import { useCurrentUserOrOrganizationHasFeature } from "../../hooks/useCurrentUserOrOrganizationHasFeature.ts";
import { useDeleteProjectFavorite } from "../../hooks/useDeleteProjectFavorite.ts";
import { useDeleteProjectMembership } from "../../hooks/useDeleteProjectMembership.ts";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser.ts";
import { useGetThreadMembership } from "../../hooks/useGetThreadMembership.ts";
import { useMarkProjectRead } from "../../hooks/useMarkProjectRead.ts";
import { useMarkProjectUnread } from "../../hooks/useMarkProjectUnread.ts";
import { useUnarchiveProject } from "../../hooks/useUnarchiveProject.ts";
interface ProjectOverflowMenuProps extends React.PropsWithChildren {
    type: 'dropdown' | 'context';
    project: Project;
    size?: 'sm';
    onOpenChange?: (open: boolean) => void;
}
export function ProjectOverflowMenu({ type, project, size, onOpenChange, children }: ProjectOverflowMenuProps) {
    const router = useRouter();
    const [copy] = useCopyToClipboard();
    const { data: currentUser } = useGetCurrentUser();
    const createFavorite = useCreateProjectFavorite();
    const deleteFavorite = useDeleteProjectFavorite();
    const { mutate: markProjectRead } = useMarkProjectRead();
    const { mutate: markProjectUnread } = useMarkProjectUnread();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [removePrivateProjectMembershipDialogOpen, setRemovePrivateProjectMembershipDialogOpen] = useState(false);
    const [removeProjectMembershipDialogOpen, setRemoveProjectMembershipDialogOpen] = useState(false);
    const [integrationsDialogOpen, setIntegrationsDialogOpen] = useState(false);
    const [notificationsDialogOpen, setNotificationsDialogOpen] = useState(false);
    const [threadNotificationsDialogOpen, setThreadNotificationsDialogOpen] = useState(false);
    const unarchiveProject = useUnarchiveProject();
    const [archiveDialogIsOpen, setArchiveDialogIsOpen] = useState(false);
    const isProjectView = router.pathname === '/[org]/projects/[projectId]';
    const { mutate: deleteProjectMembership } = useDeleteProjectMembership(project.id);
    const { mutate: createProjectMembership } = useCreateProjectMembership(project.id);
    const { data: threadMembership } = useGetThreadMembership({
        threadId: project.message_thread_id,
        enabled: project.viewer_is_member
    });
    const hasChatChannels = useCurrentUserOrOrganizationHasFeature('chat_channels');
    const isUnread = project.unread_for_viewer;
    const { mutate: createDataExport } = useCreateProjectDataExport();
    if (!currentUser)
        return null;
    const items = buildMenuItems([
        project.viewer_is_member && {
            type: 'item',
            leftSlot: <LogOutIcon />,
            label: 'Leave channel',
            onSelect: () => {
                if (project.private && project.members_and_guests_count === 1) {
                    setRemovePrivateProjectMembershipDialogOpen(true);
                }
                else if (project.private) {
                    setRemoveProjectMembershipDialogOpen(true);
                }
                else {
                    deleteProjectMembership({ user: currentUser });
                }
            }
        },
        !project.viewer_is_member && {
            type: 'item',
            leftSlot: <CirclePlusIcon />,
            label: 'Join channel',
            onSelect: () => {
                createProjectMembership({ userId: currentUser.id });
            }
        },
        { type: 'separator' },
        project.viewer_is_member && {
            type: 'item',
            leftSlot: project.viewer_has_favorited ? <StarFilledIcon className='text-yellow-400'/> : <StarOutlineIcon />,
            label: project.viewer_has_favorited ? 'Favorited' : 'Favorite',
            disabled: createFavorite.isPending || deleteFavorite.isPending,
            onSelect: () => {
                if (project.viewer_has_favorited) {
                    deleteFavorite.mutate(project.id);
                }
                else {
                    createFavorite.mutate(project);
                }
            }
        },
        hasChatChannels && {
            type: 'item',
            label: isUnread ? 'Mark read' : 'Mark unread',
            leftSlot: isUnread ? <CheckSquareIcon /> : <UnreadSquareBadgeIcon />,
            onSelect: () => {
                if (isUnread) {
                    markProjectRead({ projectId: project.id });
                }
                else {
                    markProjectUnread({ projectId: project.id });
                }
            }
        },
        project.viewer_is_member &&
            !project.archived &&
            !project.message_thread_id && {
            type: 'item',
            leftSlot: project.viewer_has_subscribed ? <BellCheckIcon /> : <BellIcon />,
            label: project.viewer_has_subscribed ? 'Subscribed' : 'Subscribe',
            disabled: false,
            onSelect: () => {
                setNotificationsDialogOpen(true);
            }
        },
        project.viewer_is_member &&
            !project.archived &&
            project.message_thread_id &&
            threadMembership && {
            type: 'item',
            leftSlot: threadMembership.notification_level === 'none' ? <BellIcon /> : <BellCheckIcon />,
            label: threadMembership.notification_level === 'none' ? 'Subscribe' : 'Subscribed',
            onSelect: () => {
                setThreadNotificationsDialogOpen(true);
            }
        },
        project.viewer_is_member && { type: 'separator' },
        {
            type: 'item',
            leftSlot: <LinkIcon />,
            label: 'Copy link',
            kbd: isProjectView ? 'mod+shift+c' : undefined,
            onSelect: (): void => {
                copy(project.url);
                toast('Copied to clipboard');
            }
        },
        {
            type: 'item',
            label: 'Copy ID',
            leftSlot: <CopyIcon />,
            onSelect: () => {
                copy(project.id);
                toast('Copied channel ID');
            }
        },
        { label: 'Export', type: 'item', leftSlot: <DownloadIcon />, onSelect: () => createDataExport(project.id) },
        (project.viewer_can_update || project.viewer_can_archive || project.viewer_can_destroy) && { type: 'separator' },
        project.viewer_can_archive &&
            !project.archived && {
            type: 'item',
            leftSlot: <ArchiveIcon />,
            label: 'Archive',
            onSelect: () => setArchiveDialogIsOpen(true)
        },
        project.viewer_can_update && {
            type: 'item',
            leftSlot: <PencilIcon />,
            label: 'Edit',
            onSelect: () => setEditDialogOpen(true)
        },
        project.private &&
            project.viewer_can_update && {
            type: 'item',
            label: 'Integrations',
            leftSlot: <AppsIcon />,
            onSelect: () => setIntegrationsDialogOpen(true)
        },
        project.viewer_can_archive &&
            project.archived && {
            type: 'item',
            leftSlot: <ArchiveIcon />,
            label: 'Unarchive',
            onSelect: () => unarchiveProject.mutate(project.id)
        },
        project.viewer_can_destroy && { type: 'separator' },
        project.viewer_can_destroy && {
            type: 'item',
            leftSlot: <TrashIcon />,
            label: 'Delete',
            destructive: true,
            onSelect: () => setDeleteDialogOpen(true)
        }
    ]);
    return (<>
      <ProjectRemoveMembershipDialog project={project} user={currentUser} open={removeProjectMembershipDialogOpen} onOpenChange={setRemoveProjectMembershipDialogOpen}/>
      <ProjectRemoveLastPrivateProjectMembershipDialog project={project} open={removePrivateProjectMembershipDialogOpen} onOpenChange={setRemovePrivateProjectMembershipDialogOpen}/>
      <ProjectEditDialog project={project} open={editDialogOpen} onOpenChange={setEditDialogOpen}/>
      <ProjectArchiveDialog project={project} open={archiveDialogIsOpen} onOpenChange={setArchiveDialogIsOpen}/>
      <ProjectDeleteDialog project={project} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}/>
      {project.private && project.viewer_can_update && (<ProjectIntegrationsDialog project={project} open={integrationsDialogOpen} onOpenChange={setIntegrationsDialogOpen}/>)}
      <ProjectNotificationsDialog project={project} key={`project-notifications-dialog-${project.id}-${notificationsDialogOpen}`} open={notificationsDialogOpen} onOpenChange={setNotificationsDialogOpen}/>
      {project.message_thread_id && threadMembership && (<ThreadNotificationsSettingsDialog key={`thread-notifications-dialog-${project.id}-${threadNotificationsDialogOpen}`} membership={threadMembership} threadId={project.message_thread_id} open={threadNotificationsDialogOpen} onOpenChange={setThreadNotificationsDialogOpen}/>)}

      {type === 'context' ? (<ContextMenu asChild items={items} onOpenChange={onOpenChange}>
          {children}
        </ContextMenu>) : (<DropdownMenu align='end' items={items} onOpenChange={onOpenChange} trigger={<Button variant='plain' size={size} iconOnly={<DotsHorizontal />} accessibilityLabel='Open menu'/>}/>)}
    </>);
}
