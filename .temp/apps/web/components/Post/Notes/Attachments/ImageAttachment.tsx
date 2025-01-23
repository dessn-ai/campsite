import { useState } from 'react';
import Image from 'next/image';
import { Attachment } from "../../../../../../packages/types/index.ts";
import { AlertIcon } from "../../../../../../packages/ui/src/Icons/index.tsx";
import { cn } from "../../../../../../packages/ui/src/utils/index.ts";
import { UIText } from "../../../../../../packages/ui/src/Text/index.tsx";
interface Props {
    attachment: Attachment;
    isUploading: boolean;
}
const FALLBACK_WIDTH = 800;
const FALLBACK_HEIGHT = 400;
export function fitDimensions({ width, height }: {
    width?: number;
    height?: number;
}) {
    return {
        width: Math.min(width || FALLBACK_WIDTH, FALLBACK_WIDTH),
        height: Math.min(height || FALLBACK_HEIGHT, FALLBACK_HEIGHT)
    };
}
export function ImageAttachment(props: Props) {
    const { attachment, isUploading } = props;
    const [failed, setFailed] = useState(false);
    const { width, height } = fitDimensions(attachment);
    // prefer the client src if it exists to avoid flickering
    const src = attachment.optimistic_src || attachment.image_urls?.feed_url;
    if (!src) {
        return <div style={{ aspectRatio: `${width}/${height}` }} className='w-full max-w-full rounded'/>;
    }
    if (failed) {
        return (<div style={{
                width,
                height
            }} className='bg-secondary text-tertiary flex max-h-[50vh] items-center justify-center gap-1.5 rounded object-contain'>
        <AlertIcon />
        <UIText tertiary>Unable to load image</UIText>
      </div>);
    }
    return (<Image alt='Image attachment' src={src ?? ''} width={width} height={height} draggable={false} className={cn('max-h-[50vh] rounded object-contain', {
            'opacity-30': isUploading,
            'bg-secondary': failed
        })} onError={() => setFailed(true)}/>);
}
