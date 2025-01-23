import { Button, GifIcon } from "../../../../packages/ui/src/index.tsx";
import { GifPicker } from "./GifPicker.tsx";
import { MarkdownEditorRef } from "../MarkdownEditor/index.tsx";
interface ComposerGifPickerProps {
    open?: boolean;
    onOpenChange?: (value: boolean) => void;
    editorRef: React.RefObject<MarkdownEditorRef>;
    disabled?: boolean;
}
export function ComposerGifPicker({ open, onOpenChange, editorRef, disabled }: ComposerGifPickerProps) {
    return (<GifPicker open={open} onOpenChange={onOpenChange} trigger={<Button variant='plain' type='button' iconOnly={<GifIcon />} accessibilityLabel='Add GIF' tooltip='Add GIF' disabled={disabled}/>} onGifSelect={(gif) => editorRef.current?.uploadAndAppendAttachments([gif])} onClose={() => editorRef.current?.focus('restore')}/>);
}
