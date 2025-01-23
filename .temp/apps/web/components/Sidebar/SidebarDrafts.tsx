import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { PostDraftIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { SidebarLink } from "./SidebarLink.tsx";
import { SidebarUnreadBadge } from "./SidebarUnreadBadge.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useGetPersonalDraftPosts } from "../../hooks/useGetPersonalDraftPosts.ts";
import { flattenInfiniteData } from "../../utils/flattenInfiniteData.ts";
export function SidebarDrafts() {
    const router = useRouter();
    const { scope } = useScope();
    const { data: draftPostsData } = useGetPersonalDraftPosts();
    const draftPosts = useMemo(() => flattenInfiniteData(draftPostsData) ?? [], [draftPostsData]);
    const isActive = router.pathname === '/[org]/drafts';
    if (draftPosts.length === 0 && !isActive)
        return null;
    return (<SidebarLink id='drafts' label='Drafts' active={isActive} leadingAccessory={<PostDraftIcon />} trailingAccessory={draftPosts.length > 0 ? (<SidebarUnreadBadge important={false}>{draftPosts.length}</SidebarUnreadBadge>) : undefined} href={`/${scope}/drafts`}/>);
}
