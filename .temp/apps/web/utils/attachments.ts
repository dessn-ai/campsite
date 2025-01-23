import { Attachment } from "../../../packages/types/index.ts";
export function isRenderable(attachment: Attachment) {
    return attachment.image || attachment.gif || attachment.video || attachment.lottie || attachment.link;
}
