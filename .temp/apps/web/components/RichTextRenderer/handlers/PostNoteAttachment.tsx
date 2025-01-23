import { InlineAttachmentRenderer } from "../../InlineAttachmentRenderer.tsx";
import { NodeHandler } from "./index.ts";
export interface PostNoteAttachmentOptions {
    onOpenAttachment?: (attachmentId: string) => void;
}
export const PostNoteAttachment: NodeHandler<PostNoteAttachmentOptions> = ({ node, onOpenAttachment }) => {
    const { id, optimistic_id } = node?.attrs ?? {};
    return <InlineAttachmentRenderer id={id} optimisticId={optimistic_id} onOpen={onOpenAttachment}/>;
};
