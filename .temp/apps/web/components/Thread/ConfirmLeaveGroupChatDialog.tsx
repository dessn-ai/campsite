import { useRouter } from 'next/router';
import { MessageThread } from "../../../../packages/types/index.ts";
import { Button } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useGetThreads } from "../../hooks/useGetThreads.ts";
import { useLeaveThread } from "../../hooks/useLeaveThread.ts";
interface Props {
    thread: MessageThread;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export function ConfirmLeaveGroupChatDialog({ thread, open, onOpenChange }: Props) {
    const router = useRouter();
    const { scope } = useScope();
    const { mutate: leaveThread } = useLeaveThread({ threadId: thread.id });
    const { data: inbox } = useGetThreads();
    const { threads } = inbox || {};
    function handleLeave() {
        leaveThread({}, {
            onSuccess: () => {
                const otherThreads = threads?.filter((t) => t.id !== thread.id);
                if (otherThreads?.length) {
                    router.push(`/${scope}/chat/${otherThreads[0].id}`);
                }
                else {
                    router.push(`/${scope}`);
                }
                onOpenChange(false);
            }
        });
    }
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='base'>
      <Dialog.Header>
        <Dialog.Title>Leave conversation?</Dialog.Title>
        <Dialog.Description>
          You will stop receiving messages from this conversation. Any messages you sent will still be visible to other
          members.
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleLeave} disabled={false} autoFocus>
            Leave group chat
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </Dialog.Root>);
}
