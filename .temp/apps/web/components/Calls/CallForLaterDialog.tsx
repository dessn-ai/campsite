import { useEffect, useState } from 'react';
import { CallRoom } from "../../../../packages/types/generated.ts";
import { Button, TextField, UIText } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { useCreateCallRoom } from "../../hooks/useCreateCallRoom.ts";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export function CallForLaterDialog({ open, onOpenChange }: Props) {
    const { mutate: createCallRoom } = useCreateCallRoom();
    const [callRoom, setCallRoom] = useState<CallRoom>();
    useEffect(() => {
        if (open)
            createCallRoom({ source: 'new_call_button' }, { onSuccess: setCallRoom });
    }, [createCallRoom, open]);
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='sm'>
      <Dialog.Header>
        <Dialog.Title>Call link</Dialog.Title>
      </Dialog.Header>

      <Dialog.Content>
        <div className='flex flex-col gap-2'>
          <TextField readOnly clickToCopy={!!callRoom?.url} value={callRoom?.url}/>
          <Dialog.Description asChild>
            <UIText secondary>
              Share this URL with anyone, anywhere. Whoever clicks it will join your call, no Campsite account required.
            </UIText>
          </Dialog.Description>
        </div>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </Dialog.Root>);
}
