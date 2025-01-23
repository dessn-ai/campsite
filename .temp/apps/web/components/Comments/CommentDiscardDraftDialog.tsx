import { useRef, useState } from 'react';
import { Button } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
interface CommentDiscardDraftDialogProps {
    enabled: boolean;
    onDiscard: () => void;
}
export function CommentDiscardDraftDialog({ enabled, onDiscard }: CommentDiscardDraftDialogProps) {
    const triggerRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    function handleDiscard() {
        if (!enabled) {
            onDiscard();
            triggerRef.current?.blur();
            return;
        }
        setDialogIsOpen(true);
    }
    function handleConfirm() {
        onDiscard();
        setDialogIsOpen(false);
    }
    return (<>
      <Button ref={triggerRef} variant='flat' onClick={handleDiscard}>
        Cancel
      </Button>

      <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen} size='lg'>
        <Dialog.Header>
          <Dialog.Title>Discard draft</Dialog.Title>
          <Dialog.Description>Are you sure you want to discard this comment draft?</Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Dialog.TrailingActions>
            <Button onClick={() => setDialogIsOpen(false)}>Cancel</Button>
            <Button variant='destructive' onClick={handleConfirm} autoFocus>
              Discard
            </Button>
          </Dialog.TrailingActions>
        </Dialog.Footer>
      </Dialog.Root>
    </>);
}
