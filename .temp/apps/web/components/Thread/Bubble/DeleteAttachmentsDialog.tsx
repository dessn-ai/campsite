import { useState } from 'react';
import { Message, MessageThread } from "../../../../../packages/types/index.ts";
import { Button, Checkbox, Dialog, UIText } from "../../../../../packages/ui/src/index.tsx";
import { FileTypeIcon } from "../../FileTypeIcon.tsx";
import { AttachmentCard } from "./AttachmentCard/index.tsx";
import { useDeleteMessage } from "../../../hooks/useDeleteMessage.ts";
import { useDeleteMessageAttachment } from "../../../hooks/useDeleteMessageAttachment.ts";
import { isRenderable } from "../../../utils/attachments.ts";
import { getFileMetadata } from "../../../utils/getFileMetadata.ts";
interface Props {
    message: Message;
    thread: MessageThread;
    open: boolean;
    setOpen: (open: boolean) => void;
}
export function DeleteAttachmentsDialog({ message, thread, open, setOpen }: Props) {
    const [selected, setSelected] = useState(new Set<string>());
    const deleteAttachment = useDeleteMessageAttachment();
    const deleteMessage = useDeleteMessage();
    return (<Dialog.Root open={open} onOpenChange={(open) => {
            setOpen(open);
            if (!open) {
                setSelected(new Set());
            }
        }} disableDescribedBy>
      <Dialog.Header>
        <Dialog.Title>Delete attachments</Dialog.Title>
        <Dialog.CloseButton />
      </Dialog.Header>
      <Dialog.Content>
        <form className='-m-1 flex flex-col overflow-hidden p-1' onSubmit={(evt) => {
            evt.preventDefault();
            setOpen(false);
            if (selected.size === 0)
                return;
            if (selected.size === message.attachments.length && !message.has_content) {
                deleteMessage.mutate({ threadId: thread.id, messageId: message.id });
            }
            else {
                Array.from(selected).map((id) => {
                    deleteAttachment.mutate({ threadId: thread.id, messageId: message.id, attachmentId: id });
                });
            }
        }}>
          <ul className='flex flex-col gap-2 overflow-hidden'>
            {message.attachments.map((attachment) => {
            const metadata = getFileMetadata(attachment);
            return (<li key={attachment.id} className='flex items-center gap-3'>
                  <Checkbox id={`attachment-${attachment.id}`} checked={selected.has(attachment.id)} onChange={() => {
                    setSelected((selected) => {
                        const next = new Set(selected);
                        if (selected.has(attachment.id)) {
                            next.delete(attachment.id);
                        }
                        else {
                            next.add(attachment.id);
                        }
                        return next;
                    });
                }}/>
                  <label className='flex-1 overflow-hidden' htmlFor={`attachment-${attachment.id}`}>
                    <UIText className='truncate font-mono'>{metadata.name}</UIText>
                  </label>

                  <div className='relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
                    {isRenderable(attachment) ? (<AttachmentCard attachment={attachment}/>) : (<FileTypeIcon {...metadata}/>)}
                    <div className='absolute inset-0 rounded-lg border'/>
                  </div>
                </li>);
        })}
          </ul>

          <div className='mt-4 flex justify-between gap-2'>
            {selected.size === message.attachments.length ? (<Button type='button' onClick={() => setSelected(new Set())}>
                Unselect all
              </Button>) : (<Button type='button' onClick={() => setSelected(new Set(message.attachments.map((a) => a.id)))}>
                Select all
              </Button>)}
            <Button type='submit' variant='destructive' disabled={selected.size === 0}>
              Delete
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>);
}
