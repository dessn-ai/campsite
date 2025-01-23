import { Button, TrashIcon } from "../../../../../../packages/ui/src/index.tsx";
import { EmbedActionsContainer } from "../EmbedContainer.tsx";
interface Props {
    onDelete?: () => void;
}
export function NoteAttachmentHoverActions({ onDelete }: Props) {
    return (<EmbedActionsContainer>
      {onDelete && (<Button iconOnly={<TrashIcon size={20}/>} variant='plain' accessibilityLabel='Delete attachment' contentEditable={false} onClick={onDelete} tooltip='Delete attachment'/>)}
    </EmbedActionsContainer>);
}
