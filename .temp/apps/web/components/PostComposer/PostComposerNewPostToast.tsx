import { useEffect } from 'react';
import Router from 'next/router';
import { Post } from "../../../../packages/types/generated.ts";
import { ToastWithLink } from "../../../../packages/ui/src/Toast/index.ts";
import { useScope } from "../../contexts/scope.tsx";
export function PostComposerNewPostToast({ post }: {
    post: Post;
}) {
    const { scope } = useScope();
    useEffect(() => {
        Router.prefetch(`/${scope}/posts/${post.id}`);
    }, [scope, post.id]);
    return <ToastWithLink url={post.url}>Post created</ToastWithLink>;
}
