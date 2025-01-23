import React from 'react';
import { JSONContent } from '@tiptap/core';
import { MediaGalleryOptions } from "../../../../../packages/editor/src/index.ts";
import { PostNoteAttachmentOptions } from "./PostNoteAttachment.tsx";
import { TaskItemOptions } from "./TaskItem.tsx";
interface NodeProps {
    node: JSONContent;
}
export type NodeHandler<T = {}> = React.FC<React.PropsWithChildren & NodeProps & T>;
export interface PostHandlersOptions {
    mediaGallery?: MediaGalleryOptions;
    postNoteAttachment?: PostNoteAttachmentOptions;
    taskItem?: TaskItemOptions;
}
