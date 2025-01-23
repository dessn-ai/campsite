import { DeleteDraftDialog } from "../Drafts/DeleteDraftDialog.tsx";
import { usePostComposerIsEditingPost } from "./hooks/usePostComposerIsEditingPost.ts";
interface PostComposerDeleteDraftPostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}
export const PostComposerDeleteDraftPostDialog = ({ open, onOpenChange, onSuccess }: PostComposerDeleteDraftPostDialogProps) => {
    const { initialPost } = usePostComposerIsEditingPost();
    return <DeleteDraftDialog post={initialPost} open={open} onOpenChange={onOpenChange} onSuccess={onSuccess}/>;
};
