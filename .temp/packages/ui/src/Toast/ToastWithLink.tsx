import { Button } from "../Button/index.tsx";
import { useCopyToClipboard } from "../hooks/index.tsx";
import { CheckIcon, LinkIcon } from "../Icons/index.tsx";
import { UIText } from "../Text/index.tsx";
import { cn } from "../utils/index.ts";
interface ToastWithLinkProps extends React.PropsWithChildren {
    url: string;
    externalLink?: boolean;
    hideCopyLink?: boolean;
}
export function ToastWithLink({ url, externalLink, hideCopyLink, children }: ToastWithLinkProps) {
    const [copy, isCopied] = useCopyToClipboard();
    return (<span className='-my-1 -mr-3 flex items-center gap-5'>
      <UIText weight='font-medium'>{children}</UIText>
      <span className='flex items-center gap-0.5'>
        {!hideCopyLink && (<Button variant='flat' className={cn({
                'bg-white/20 hover:bg-white/30': !isCopied,
                'bg-green-500 hover:bg-green-500 dark:bg-green-500': isCopied
            })} round tooltip='Copy link' onClick={() => copy(url)} iconOnly={isCopied ? <CheckIcon /> : <LinkIcon />} accessibilityLabel='Copy link'/>)}
        <Button variant='flat' className='bg-white/20 hover:bg-white/30' round href={url} externalLink={externalLink}>
          View
        </Button>
      </span>
    </span>);
}
