import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { Dialog } from "../../../../packages/ui/src/Dialog/index.tsx";
import { useUnresolvePost } from "../../hooks/useUnresolvePost.ts";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    postId: string;
}
export function ConfirmDeleteResolutionDialog({ open, onOpenChange, postId }: Props) {
    const { mutate: unresolvePost } = useUnresolvePost();
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='lg'>
      <Dialog.Header>
        <Dialog.Title>Reopen post?</Dialog.Title>
        <Dialog.Description>The previous resolution will be deleted and the post will reopened.</Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={() => {
            onOpenChange(false);
            unresolvePost({ postId });
        }} autoFocus>
            Reopen post
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </Dialog.Root>);
}
