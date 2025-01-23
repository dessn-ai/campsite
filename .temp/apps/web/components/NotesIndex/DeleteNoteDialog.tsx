import { useRouter } from 'next/router';
import { Button } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { useGoBack } from "../Providers/HistoryProvider.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useDeleteNote } from "../../hooks/useDeleteNote.ts";
import { apiErrorToast } from "../../utils/apiErrorToast.ts";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    noteId?: string;
    noteProjectId?: string;
}
export function DeleteNoteDialog({ open, onOpenChange, noteId, noteProjectId }: Props) {
    const goBack = useGoBack();
    const { scope } = useScope();
    const { mutate: deleteNote } = useDeleteNote();
    const router = useRouter();
    function onDelete() {
        if (!noteId)
            return;
        deleteNote({ noteId, noteProjectId }, {
            onSuccess: () => {
                const isNoteView = router.pathname === '/[org]/notes/[noteId]';
                if (isNoteView) {
                    goBack({ fallbackPath: `/${scope}/notes` });
                }
            },
            onError: apiErrorToast
        });
        onOpenChange(false);
    }
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='sm'>
      <Dialog.Header>
        <Dialog.Title>Delete document</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this document? This action cannot be undone.
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={onDelete} autoFocus>
            Delete
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </Dialog.Root>);
}
