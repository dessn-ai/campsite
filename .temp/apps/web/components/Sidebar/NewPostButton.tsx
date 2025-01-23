import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { LayeredHotkeys } from "../../../../packages/ui/src/DismissibleLayer/index.tsx";
import { PostIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { usePostComposer, usePostComposerHasLocalDraft, usePostComposerIsOpen } from "../PostComposer/index.ts";
import { ViewerUpsellDialog } from "../Upsell/ViewerUpsellDialog.tsx";
import { useGetCurrentOrganization } from "../../hooks/useGetCurrentOrganization.ts";
export function NewPostButton() {
    const router = useRouter();
    const { showPostComposer } = usePostComposer();
    const { isPostComposerOpen } = usePostComposerIsOpen();
    const { hasLocalDraft } = usePostComposerHasLocalDraft();
    const { data: currentOrganization } = useGetCurrentOrganization();
    const [showViewerUpsellDialog, setShowViewerUpsellDialog] = useState(false);
    const canPost = currentOrganization?.viewer_can_post;
    const showDraftHint = hasLocalDraft && !isPostComposerOpen;
    const isViewingChatThread = router.pathname === '/[org]/chat/[threadId]';
    const composerKeyboardToggle = () => {
        if (isViewingChatThread)
            return;
        if (!canPost)
            return setShowViewerUpsellDialog(true);
        openComposer();
    };
    const openComposer = () => {
        showPostComposer();
    };
    return (<>
      <LayeredHotkeys keys='c' callback={composerKeyboardToggle} options={{ preventDefault: true }}/>

      <div className='relative isolate'>
        <Button tooltip={showDraftHint ? 'Resume post' : 'New post'} tooltipShortcut='c' onClick={() => (canPost ? openComposer() : setShowViewerUpsellDialog(true))} fullWidth variant='base'>
          {showDraftHint ? 'Resume post' : 'New post'}
        </Button>
      </div>

      {!canPost && (<ViewerUpsellDialog open={showViewerUpsellDialog} onOpenChange={setShowViewerUpsellDialog} icon={<PostIcon size={28}/>} title='Posting is available to members'/>)}
    </>);
}
