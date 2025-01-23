import { Attachment } from "../../../../packages/types/index.ts";
export const stableId = (attachment: Attachment) => attachment.optimistic_id ?? attachment.id;
