import { Button, FaceSmilePlusIcon } from "../../../../packages/ui/src/index.tsx";
import { MarkdownEditorRef } from "../MarkdownEditor/index.tsx";
import { ReactionPicker } from "./ReactionPicker.tsx";
interface ComposerReactionPickerProps {
    open?: boolean;
    onOpenChange?: (value: boolean) => void;
    editorRef: React.RefObject<MarkdownEditorRef>;
    disabled?: boolean;
}
export function ComposerReactionPicker({ open, onOpenChange, editorRef, disabled }: ComposerReactionPickerProps) {
    return (<ReactionPicker open={open} onOpenChange={onOpenChange} custom trigger={<Button variant='plain' type='button' iconOnly={<FaceSmilePlusIcon />} accessibilityLabel='Add emoji' tooltip='Add emoji' tooltipShortcut=':' disabled={disabled}/>} onReactionSelect={(emoji) => editorRef.current?.insertReaction(emoji)} onClose={() => editorRef.current?.focus('restore')}/>);
}
