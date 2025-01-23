import { useEffect } from 'react';
import Router from 'next/router';
import { ToastWithLink } from "../../../../packages/ui/src/Toast/index.ts";
import { useScope } from "../../contexts/scope.tsx";
export function PostComposerNewDraftToast() {
    const { scope } = useScope();
    useEffect(() => {
        Router.prefetch(`/${scope}/drafts`);
    }, [scope]);
    return (<ToastWithLink url={`/${scope}/drafts`} hideCopyLink>
      Draft created
    </ToastWithLink>);
}
