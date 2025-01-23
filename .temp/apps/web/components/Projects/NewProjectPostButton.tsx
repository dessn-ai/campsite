import { Button, ButtonProps } from "../../../../packages/ui/src/Button/index.tsx";
import { usePostComposer } from "../PostComposer/index.ts";
interface NewPostButtonProps {
    projectId?: string;
    onClick?: () => void;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
}
export function NewProjectPostButton({ projectId, onClick, variant = 'flat', size = 'base' }: NewPostButtonProps) {
    const { showPostComposer } = usePostComposer();
    return (<Button size={size} variant={variant} onClick={() => {
            showPostComposer({ projectId });
            onClick?.();
        }}>
      New post
    </Button>);
}
