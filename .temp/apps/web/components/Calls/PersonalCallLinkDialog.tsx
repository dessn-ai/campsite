import { Button, TextField, UIText } from "../../../../packages/ui/src/index.tsx";
import * as Dialog from "../../../../packages/ui/src/Dialog/index.tsx";
import { useGetPersonalCallRoom } from "../../hooks/useGetPersonalCallRoom.ts";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export function PersonalCallLinkDialog({ open, onOpenChange }: Props) {
    const { data: personalCallRoom } = useGetPersonalCallRoom();
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='sm'>
      <Dialog.Header>
        <Dialog.Title>Your personal call link</Dialog.Title>
      </Dialog.Header>

      <Dialog.Content>
        <div className='flex flex-col gap-2'>
          <TextField readOnly clickToCopy={!!personalCallRoom?.url} value={personalCallRoom?.url}/>
          <Dialog.Description asChild>
            <UIText secondary>
              This link will be valid forever. Try including it as the location in your calendar. Whoever clicks it will
              join your call, no Campsite account required.
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
