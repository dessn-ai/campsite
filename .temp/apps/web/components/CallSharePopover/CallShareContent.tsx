import { Call } from "../../../../packages/types/generated.ts";
import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { useCopyToClipboard } from "../../../../packages/ui/src/hooks/index.tsx";
import { CheckIcon, LinkIcon, PostPlusIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
import { CallProjectPermissions } from "./CallProjectPermissions.tsx";
import { usePostComposer } from "../PostComposer/index.ts";
import { PostComposerType } from "../PostComposer/utils/index.ts";
interface CallShareContentProps {
    call: Call;
    onOpenChange: (open: boolean) => void;
}
export function CallShareContent({ call, onOpenChange }: CallShareContentProps) {
    const [copy, isCopied] = useCopyToClipboard();
    const { showPostComposer } = usePostComposer();
    const canCreatePost = call.project_permission !== 'none';
    return (<>
      {call.viewer_can_edit && (<div className='flex flex-col gap-3 p-4'>
          <CallProjectPermissions call={call}/>
        </div>)}

      <div className='dark:bg-elevated bg-secondary flex gap-3 rounded-lg border-t px-4 py-3'>
        <Button variant='flat' fullWidth onClick={() => {
            if (!isCopied)
                copy(window.location.href);
        }} leftSlot={isCopied ? <CheckIcon /> : <LinkIcon />} className={cn({
            '!border-transparent !bg-green-500 !text-white !shadow-none !outline-none !ring-0': isCopied
        })} tooltipShortcut='mod+shift+c'>
          {isCopied ? 'Copied' : 'Copy link'}
        </Button>
        <Button variant='flat' fullWidth onClick={() => {
            onOpenChange(false);
            showPostComposer({ type: PostComposerType.DraftFromCall, call });
        }} leftSlot={<PostPlusIcon />} disabled={!canCreatePost} tooltip={!canCreatePost ? 'Move this private call to a channel to create a post' : undefined}>
          Start a post...
        </Button>
      </div>
    </>);
}
