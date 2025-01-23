import { MediaGalleryItemAttributes, MediaGalleryOptions } from "../../../../../packages/editor/src/index.ts";
import { MediaGallery as MediaGalleryComponent } from "../../MediaGallery/index.tsx";
import { NodeHandler } from "./index.ts";
export const MediaGallery: NodeHandler<MediaGalleryOptions> = ({ node, onOpenAttachment }) => {
    const attachments = (node.content?.map((c: any) => c.attrs) ?? []) as MediaGalleryItemAttributes[];
    const galleryId = node.attrs?.id;
    return <MediaGalleryComponent attachments={attachments} onOpenAttachment={onOpenAttachment} galleryId={galleryId}/>;
};
