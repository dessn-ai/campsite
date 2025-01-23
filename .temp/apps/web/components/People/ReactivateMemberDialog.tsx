import { SyncOrganizationMember } from "../../../../packages/types/index.ts";
import { Button } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { useReactivateOrganizationMember } from "../../hooks/useReactivateOrganizationmember.ts";
interface Props {
    member: SyncOrganizationMember;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export function ReactivateMemberDialog({ member, open, onOpenChange }: Props) {
    const reactivateMemberMutation = useReactivateOrganizationMember();
    async function handleOnRemove() {
        await reactivateMemberMutation.mutate({ id: member.id }, {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    }
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='sm'>
      <Dialog.Header>
        <Dialog.Title>Reactivate {member.user.display_name}</Dialog.Title>
        <Dialog.Description>
          Reactivating {member.user.display_name} will add them back to your organization immediately.
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleOnRemove} disabled={reactivateMemberMutation.isPending} autoFocus>
            {reactivateMemberMutation.isPending ? 'Reactivating...' : 'Reactivate'}
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </Dialog.Root>);
}
