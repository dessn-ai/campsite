import toast from 'react-hot-toast';
import { COMMUNITY_SLUG, WEB_URL } from "../../../../packages/config/src/index.ts";
import { Button, TextField } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { useCopyToClipboard } from "../../../../packages/ui/src/hooks/index.tsx";
export function CommunityInviteDialog({ open, onOpenChange }: {
    open: boolean;
    onOpenChange: (val: boolean) => void;
}) {
    const [copy] = useCopyToClipboard();
    const link = `${WEB_URL}/${COMMUNITY_SLUG}/join`;
    return (<>
      <Dialog.Root open={open} onOpenChange={onOpenChange} size='lg'>
        <Dialog.Header>
          <Dialog.Title>Invite people</Dialog.Title>
          <Dialog.Description>
            Invite other designers to share work-in-progress, give feedback, and connect with others.
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Content>
          <TextField id='invitation-link' name='invitation-link' readOnly label='Invitation link' labelHidden clickToCopy value={link}/>
        </Dialog.Content>
        <Dialog.Footer>
          <Dialog.TrailingActions>
            <Button variant='flat' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant='primary' onClick={() => {
            copy(link as string);
            toast('Copied to clipboard');
        }}>
              Copy link
            </Button>
          </Dialog.TrailingActions>
        </Dialog.Footer>
      </Dialog.Root>
    </>);
}
