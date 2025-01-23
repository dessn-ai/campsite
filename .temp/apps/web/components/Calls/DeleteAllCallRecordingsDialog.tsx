import { Call } from "../../../../packages/types/index.ts";
import { Button } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { useDeleteAllCallRecordings } from "../../hooks/useDeleteAllCallRecordings.ts";
interface Props {
    call: Call;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete?: () => void;
}
export function DeleteAllCallRecordingsDialog({ call, open, onOpenChange, onDelete }: Props) {
    const { mutate: deleteRecording, isPending } = useDeleteAllCallRecordings({ callId: call.id });
    function handleDelete() {
        deleteRecording();
        onOpenChange(false);
        onDelete?.();
    }
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='sm'>
      <Dialog.Header>
        <Dialog.Title>Delete call</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this call? This action cannot be undone.
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant='destructive' onClick={handleDelete} disabled={isPending} autoFocus>
            Delete call
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </Dialog.Root>);
}
