import React from 'react';
import { useRemoveOrganizationInvitation } from "../../hooks/useRemoveOrganizationInvitation.ts";
import { OrganizationInvitation } from "../../../../packages/types/index.ts";
import { Button } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
interface Props {
    invitation: OrganizationInvitation;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export function RemoveInvitationDialog(props: Props) {
    const { invitation, open, onOpenChange } = props;
    const removeInvitationMutation = useRemoveOrganizationInvitation();
    async function handleOnRemove() {
        await removeInvitationMutation.mutate({ id: invitation.id });
        onOpenChange(false);
    }
    if (!open)
        return null;
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='sm'>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Remove invitation</Dialog.Title>
          <Dialog.Description>{`Are you sure you want to remove the invitation for ${invitation.email}?`}</Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Dialog.TrailingActions>
            <Button variant='flat' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleOnRemove} disabled={removeInvitationMutation.isPending} autoFocus>
              {removeInvitationMutation.isPending ? 'Removing...' : 'Remove invitation'}
            </Button>
          </Dialog.TrailingActions>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>);
}
