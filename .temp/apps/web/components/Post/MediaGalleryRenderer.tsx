import { Editor } from '@tiptap/core';
import { NodeViewWrapperProps } from '@tiptap/react';
import { MediaGalleryItemAttributes } from "../../../../packages/editor/src/extensions/index.ts";
import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { TrashIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { MediaGallery } from "../MediaGallery/index.tsx";
import { useUploadNoteAttachments } from "./Notes/Attachments/useUploadAttachments.ts";
import { EmbedActionsContainer, EmbedContainer } from "./Notes/EmbedContainer.tsx";
import { useUploadHelpers } from "../../hooks/useUploadHelpers.ts";
function useUploadGalleryAttachments({ galleryId, editor }: {
    galleryId: string;
    editor: Editor;
}) {
    const upload = useUploadNoteAttachments({ enabled: true });
    return useUploadHelpers({
        enabled: true,
        upload: (files: File[]) => {
            return upload({ files, galleryId, editor });
        }
    });
}
export function MediaGalleryRenderer(props: NodeViewWrapperProps) {
    const attachments = (props.node.content?.content?.map((c: any) => c.attrs) ?? []) as MediaGalleryItemAttributes[];
    const editable = !!props.editor.options.editable;
    const galleryId = props.node.attrs.id;
    const { dropzone } = useUploadGalleryAttachments({
        galleryId,
        editor: props.editor
    });
    function updateOrder(ids: string[]) {
        props.editor.commands.updateGalleryOrder(galleryId, ids);
    }
    return (<EmbedContainer draggable selected={props.selected} editor={props.editor} className='my-4'>
      <div className='relative' {...dropzone.getRootProps()}>
        <MediaGallery attachments={attachments} onRemoveItem={editable ? props.editor.commands.removeGalleryItem : undefined} onReorder={editable ? updateOrder : undefined} dropzone={editable ? dropzone : undefined} onOpenAttachment={props.extension.options.onOpenAttachment} editable={editable} galleryId={galleryId}/>

        {editable && (<>
            <input {...dropzone.getInputProps()}/>
            <EmbedActionsContainer>
              <Button iconOnly={<TrashIcon size={20}/>} variant='plain' accessibilityLabel='Delete gallery' contentEditable={false} onClick={props.deleteNode} tooltip='Delete gallery'/>
            </EmbedActionsContainer>
          </>)}
      </div>
    </EmbedContainer>);
}
