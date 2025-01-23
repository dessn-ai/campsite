import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Note } from "../../../../packages/types/index.ts";
import { Button, ContextMenu, CopyIcon, DotsHorizontal, GlobeIcon, LayeredHotkeys, LinkIcon, PaperAirplaneIcon, PinTackFilledIcon, PinTackIcon, ProjectIcon, StarFilledIcon, StarOutlineIcon, TrashIcon } from "../../../../packages/ui/src/index.tsx";
import { DropdownMenu } from "../../../../packages/ui/src/DropdownMenu/index.tsx";
import { buildMenuItems } from "../../../../packages/ui/src/Menu/index.ts";
import { useCopyToClipboard } from "../../../../packages/ui/src/hooks/index.tsx";
import { FollowUpCalendarDialog } from "../FollowUp/index.ts";
import { NoteShareDialog } from "../NoteSharePopover/NoteShareDialog.tsx";
import { MoveNoteProjectDialog } from "../Projects/MoveNoteProjectDialog.tsx";
import { useCreateNoteFavorite } from "../../hooks/useCreateNoteFavorite.ts";
import { useCreateNotePin } from "../../hooks/useCreateNotePin.ts";
import { useDeleteNoteFavorite } from "../../hooks/useDeleteNoteFavorite.ts";
import { useDeleteNotePin } from "../../hooks/useDeleteNotePin.ts";
import { useFollowUpMenuBuilder } from "../../hooks/useFollowUpMenuBuilder.tsx";
import { DeleteNoteDialog } from "../NotesIndex/DeleteNoteDialog.tsx";
type NoteOverflowShortcuts = 'delete';
interface NoteOverflowMenuProps extends React.PropsWithChildren {
    type: 'dropdown' | 'context';
    note: Note;
    enabledShortcuts?: NoteOverflowShortcuts[];
}
export function NoteOverflowMenu({ children, type, note, enabledShortcuts }: NoteOverflowMenuProps) {
    const router = useRouter();
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [shareDialogIsOpen, setShareDialogIsOpen] = useState(false);
    const [copy] = useCopyToClipboard();
    const isNoteView = router.pathname === '/[org]/notes/[noteId]';
    const createFavorite = useCreateNoteFavorite();
    const deleteFavorite = useDeleteNoteFavorite();
    const { followUpMenuItem, calendarOpen, setCalendarOpen, createFollowUp } = useFollowUpMenuBuilder(note);
    const createPin = useCreateNotePin();
    const removePin = useDeleteNotePin();
    const [projectDialogIsOpen, setProjectDialogIsOpen] = useState(false);
    const items = buildMenuItems([
        {
            type: 'item',
            leftSlot: note.viewer_has_favorited ? <StarFilledIcon className='text-yellow-400'/> : <StarOutlineIcon />,
            label: note.viewer_has_favorited ? 'Unfavorite' : 'Favorite',
            onSelect: () => {
                if (note.viewer_has_favorited) {
                    deleteFavorite.mutate(note.id);
                }
                else {
                    createFavorite.mutate(note);
                }
            }
        },
        followUpMenuItem,
        { type: 'separator' },
        note.viewer_can_edit && {
            type: 'item',
            leftSlot: <ProjectIcon />,
            label: 'Move to channel...',
            onSelect: () => setProjectDialogIsOpen(true)
        },
        note.project && {
            type: 'item',
            leftSlot: note.project_pin_id ? <PinTackFilledIcon className='text-brand-primary'/> : <PinTackIcon />,
            label: note.project_pin_id ? 'Unpin from channel' : 'Pin to channel',
            onSelect: () => {
                if (!note.project)
                    return;
                if (note.project_pin_id) {
                    removePin.mutate({ projectId: note.project.id, pinId: note.project_pin_id, noteId: note.id });
                }
                else {
                    createPin.mutate({ projectId: note.project.id, noteId: note.id });
                }
            }
        },
        { type: 'separator' },
        (note.viewer_can_edit || note.public_visibility) && {
            type: 'item',
            leftSlot: <PaperAirplaneIcon />,
            label: 'Share',
            onSelect: () => setShareDialogIsOpen(true)
        },
        {
            type: 'item',
            leftSlot: <LinkIcon />,
            label: 'Copy link',
            kbd: isNoteView ? 'mod+shift+c' : undefined,
            onSelect: () => {
                copy(note.url);
                toast('Copied to clipboard');
            }
        },
        {
            type: 'item',
            leftSlot: <CopyIcon />,
            label: 'Copy ID',
            onSelect: () => {
                copy(note.id);
                toast('Copied to clipboard');
            }
        },
        note.public_visibility &&
            note.public_share_url && {
            type: 'item',
            leftSlot: <GlobeIcon />,
            label: 'Copy public link',
            onSelect: () => {
                copy(note.public_share_url);
                toast('Copied public link to clipboard');
            }
        },
        note.viewer_can_delete && { type: 'separator' },
        note.viewer_can_delete && {
            type: 'item',
            leftSlot: <TrashIcon />,
            label: 'Delete',
            destructive: true,
            onSelect: () => setDeleteDialogIsOpen(true)
        }
    ]);
    function hotkeyDelete() {
        if (!note.viewer_can_delete)
            return;
        setDeleteDialogIsOpen(true);
    }
    const deleteEnabled = enabledShortcuts?.includes('delete');
    if (items.length === 0)
        return null;
    if (!note)
        return null;
    return (<>
      {deleteEnabled && <LayeredHotkeys keys={['mod+delete', 'mod+backspace']} callback={hotkeyDelete}/>}

      <DeleteNoteDialog open={deleteDialogIsOpen} onOpenChange={setDeleteDialogIsOpen} noteId={note.id} noteProjectId={note.project?.id}/>
      <FollowUpCalendarDialog open={calendarOpen} onOpenChange={setCalendarOpen} onCreate={createFollowUp}/>
      <NoteShareDialog note={note} open={shareDialogIsOpen} onOpenChange={setShareDialogIsOpen}/>
      <MoveNoteProjectDialog note={note} open={projectDialogIsOpen} onOpenChange={setProjectDialogIsOpen}/>

      {type === 'context' ? (<ContextMenu asChild items={items}>
          {children}
        </ContextMenu>) : (<DropdownMenu items={items} align='end' trigger={<Button variant='plain' iconOnly={<DotsHorizontal />} accessibilityLabel='Note options'/>}/>)}
    </>);
}
