import { Attachment } from "../../../../../../packages/types/index.ts";
import { cn } from "../../../../../../packages/ui/src/utils/index.ts";
interface Props {
    attachment: Attachment;
    isUploading: boolean;
}
export function AudioAttachment(props: Props) {
    const { attachment, isUploading } = props;
    const src = attachment.optimistic_src || attachment.url;
    return (<audio id={`attachment-${attachment.id}`} controls preload='metadata' playsInline draggable={false} className={cn('min-w-full rounded transition-shadow', {
            'opacity-30': isUploading
        })}>
      {src && (<>
          <source src={src} type={attachment.file_type}/>
          <source src={src}/>
        </>)}
    </audio>);
}
