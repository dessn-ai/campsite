import { useState } from 'react';
import toast from 'react-hot-toast';
import { MessageThread } from "../../../../packages/types/index.ts";
import { AppsIcon, BellCheckIcon, BellMentionIcon, BellOffIcon, Button, CheckSquareIcon, CopyIcon, DotsHorizontal, LayeredHotkeys, LogOutIcon, PhotoIcon, StarFilledIcon, StarOutlineIcon, TrashIcon, UnreadSquareBadgeIcon, UserIcon } from "../../../../packages/ui/src/index.tsx";
import { DropdownMenu } from "../../../../packages/ui/src/DropdownMenu/index.tsx";
import { buildMenuItems } from "../../../../packages/ui/src/Menu/index.ts";
import { useCopyToClipboard } from "../../../../packages/ui/src/hooks/index.tsx";
import { ConfirmLeaveGroupChatDialog } from "./ConfirmLeaveGroupChatDialog.tsx";
import { DeleteThreadDialog } from "./DeleteThreadDialog.tsx";
import { EditGroupChatDialog } from "./EditGroupChatDialog.tsx";
import { ManageGroupChatMembersDialog } from "./ManageGroupChatMembersDialog.tsx";
import { ThreadIntegrationsDialog } from "./ThreadIntegrationsDialog.tsx";
import { useCreateThreadFavorite } from "../../hooks/useCreateThreadFavorite.ts";
import { useDeleteThreadFavorite } from "../../hooks/useDeleteThreadFavorite.ts";
import { useGetThreadMembership } from "../../hooks/useGetThreadMembership.ts";
import { useMarkThreadRead } from "../../hooks/useMarkThreadRead.ts";
import { useMarkThreadUnread } from "../../hooks/useMarkThreadUnread.ts";
import { ThreadNotificationsSettingsDialog } from "./ThreadNotificationsSettingsDialog.tsx";
export function ChatThreadOverflowMenu({ thread }: {
    thread: MessageThread;
}) {
    const [editOpen, setEditOpen] = useState(false);
    const [leaveOpen, setLeaveOpen] = useState(false);
    const [integrationsOpen, setIntegrationsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [manageMembersOpen, setManageMembersOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const { mutate: markThreadRead } = useMarkThreadRead();
    const { mutate: markThreadUnread } = useMarkThreadUnread();
    const { data: membership } = useGetThreadMembership({ threadId: thread.id, enabled: thread.viewer_is_thread_member });
    const createFavorite = useCreateThreadFavorite();
    const deleteFavorite = useDeleteThreadFavorite();
    const [copy] = useCopyToClipboard();
    const isUnread = thread.manually_marked_unread || !!thread.unread_count;
    const items = buildMenuItems([
        {
            type: 'item',
            leftSlot: thread.viewer_has_favorited ? <StarFilledIcon className='text-yellow-400'/> : <StarOutlineIcon />,
            label: thread.viewer_has_favorited ? 'Favorited' : 'Favorite',
            disabled: createFavorite.isPending || deleteFavorite.isPending,
            onSelect: () => {
                if (thread.viewer_has_favorited) {
                    deleteFavorite.mutate(thread.id);
                }
                else {
                    createFavorite.mutate(thread);
                }
            }
        },
        {
            type: 'item',
            label: isUnread ? 'Mark read' : 'Mark unread',
            leftSlot: isUnread ? <CheckSquareIcon /> : <UnreadSquareBadgeIcon />,
            kbd: 'mod+u',
            onSelect: () => {
                if (isUnread) {
                    markThreadRead({ threadId: thread.id });
                }
                else {
                    markThreadUnread({ threadId: thread.id });
                }
            }
        },
        {
            type: 'item',
            label: 'Copy ID',
            leftSlot: <CopyIcon />,
            onSelect: () => {
                copy(thread.id);
                toast('Copied thread ID');
            }
        },
        ...buildMenuItems(thread.group && [
            {
                type: 'item',
                label: 'Notification settings',
                leftSlot: membership?.notification_level === 'all' ? (<BellCheckIcon />) : membership?.notification_level === 'mentions' ? (<BellMentionIcon />) : (<BellOffIcon />),
                onSelect: () => {
                    setNotificationsOpen(true);
                }
            },
            { type: 'separator' },
            {
                type: 'item',
                label: 'Edit name and picture',
                leftSlot: <PhotoIcon />,
                onSelect: () => {
                    setEditOpen(true);
                }
            },
            {
                type: 'item',
                label: 'Add/remove people',
                leftSlot: <UserIcon />,
                onSelect: () => {
                    setManageMembersOpen(true);
                }
            },
            thread.viewer_can_manage_integrations && {
                type: 'item',
                label: 'Manage integrations',
                leftSlot: <AppsIcon />,
                onSelect: () => {
                    setIntegrationsOpen(true);
                }
            },
            { type: 'separator' },
            {
                type: 'item',
                label: 'Leave chat',
                leftSlot: <LogOutIcon />,
                destructive: true,
                onSelect: () => {
                    setLeaveOpen(true);
                }
            }
        ]),
        thread.viewer_can_delete && { type: 'separator' },
        thread.viewer_can_delete && {
            type: 'item',
            leftSlot: <TrashIcon isAnimated/>,
            label: 'Delete',
            destructive: true,
            onSelect: () => setDeleteDialogIsOpen(true)
        }
    ]);
    return (<div className='relative flex items-center gap-0.5'>
      <LayeredHotkeys keys='mod+u' callback={() => {
            if (isUnread) {
                markThreadRead({ threadId: thread.id });
            }
            else {
                markThreadUnread({ threadId: thread.id });
            }
        }} options={{ enableOnContentEditable: true }}/>

      <ConfirmLeaveGroupChatDialog thread={thread} open={leaveOpen} onOpenChange={setLeaveOpen}/>
      <EditGroupChatDialog thread={thread} open={editOpen} onOpenChange={setEditOpen}/>
      <ManageGroupChatMembersDialog thread={thread} open={manageMembersOpen} onOpenChange={setManageMembersOpen}/>
      <DeleteThreadDialog thread={thread} open={deleteDialogIsOpen} onOpenChange={setDeleteDialogIsOpen}/>

      {membership && (<ThreadNotificationsSettingsDialog threadId={thread.id} membership={membership} open={notificationsOpen} onOpenChange={setNotificationsOpen}/>)}

      {thread.viewer_can_manage_integrations && (<ThreadIntegrationsDialog thread={thread} open={integrationsOpen} onOpenChange={setIntegrationsOpen}/>)}

      <DropdownMenu items={items} align='end' trigger={<Button iconOnly={<DotsHorizontal />} accessibilityLabel='Edit name and picture' variant='plain'/>}/>
    </div>);
}
