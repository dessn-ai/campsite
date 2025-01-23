import * as Tabs from '@radix-ui/react-tabs';
import { Note } from "../../../../packages/types/index.ts";
import { Button, CheckIcon, LinkIcon, PostPlusIcon } from "../../../../packages/ui/src/index.tsx";
import { useCopyToClipboard } from "../../../../packages/ui/src/hooks/index.tsx";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
import { CopyCurrentUrl } from "../CopyCurrentUrl.tsx";
import { NoteAddPersonPermission } from "./NoteAddPeoplePermission.tsx";
import { NoteProjectPermissions } from "./NoteProjectPermissions.tsx";
import { useGetNotePermissions } from "../../hooks/useGetNotePermissions.ts";
import { NotePeoplePermissions } from "./NotePeoplePermissions.tsx";
export function ShareTab({ note, open, onOpenChange, onCompose }: {
    note: Note;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCompose: () => void;
}) {
    const { data: permissions } = useGetNotePermissions({ noteId: note.id, enabled: open });
    const [copy, isCopied] = useCopyToClipboard();
    const canCreatePost = note.project_permission !== 'none';
    return (<>
      <CopyCurrentUrl override={note.url}/>

      <Tabs.Content value='share' className='!outline-none'>
        <div className='flex flex-col gap-3 p-4'>
          <NoteProjectPermissions note={note}/>
          <NotePeoplePermissions note={note} permissions={permissions}/>
          {note.viewer_can_edit && open && <NoteAddPersonPermission note={note} permissions={permissions}/>}
        </div>

        <div className='dark:bg-elevated bg-secondary flex gap-3 rounded-b-lg border-t px-4 py-3'>
          <Button variant='flat' fullWidth onClick={() => {
            if (!isCopied)
                copy(note?.url || window.location.href);
        }} leftSlot={isCopied ? <CheckIcon /> : <LinkIcon />} className={cn({
            '!border-transparent !bg-green-500 !text-white !shadow-none !outline-none !ring-0': isCopied
        })} tooltipShortcut='mod+shift+c'>
            {isCopied ? 'Copied' : 'Copy link'}
          </Button>
          <Button variant='flat' fullWidth onClick={() => {
            onCompose();
            onOpenChange(false);
        }} leftSlot={<PostPlusIcon />} disabled={!canCreatePost} tooltip={!canCreatePost ? 'Move this private doc to a channel to create a post' : undefined}>
            Start a post...
          </Button>
        </div>
      </Tabs.Content>
    </>);
}
