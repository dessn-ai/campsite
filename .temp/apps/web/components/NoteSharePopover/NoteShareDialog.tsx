import { Note } from "../../../../packages/types/index.ts";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { NoteShareContent } from "./NoteShareContent.tsx";
interface NoteShareDialogProps {
    note: Note;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export function NoteShareDialog({ note, open, onOpenChange }: NoteShareDialogProps) {
    return (<Dialog.Root size='base' align='top' open={open} onOpenChange={onOpenChange} visuallyHiddenTitle='Share this note' disableDescribedBy>
      <Dialog.Content className='overflow-visible p-0'>
        <NoteShareContent note={note} open={open} onOpenChange={onOpenChange}/>
      </Dialog.Content>
    </Dialog.Root>);
}
