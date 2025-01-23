import { useState } from 'react';
import { useRouter } from 'next/router';
import { Post } from "../../../../packages/types/generated.ts";
import { LayeredHotkeys } from "../../../../packages/ui/src/DismissibleLayer/index.tsx";
import { LockIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { Link } from "../../../../packages/ui/src/Link/index.tsx";
import { UIText } from "../../../../packages/ui/src/Text/index.tsx";
import { PostFavoriteButton } from "./PostFavoriteButton.tsx";
import { PostFollowUpDialog } from "./PostFollowUpDialog.tsx";
import { ProjectAccessoryBreadcrumbIcon } from "../Titlebar/BreadcrumbPageIcons.tsx";
import { BreadcrumbLabel } from "../Titlebar/BreadcrumbTitlebar.tsx";
import { useScope } from "../../contexts/scope.tsx";
interface PostBreadcrumbsProps {
    post: Post;
}
export function PostBreadcrumbs({ post }: PostBreadcrumbsProps) {
    const { scope } = useScope();
    const [followUpIsOpen, setFollowUpIsOpen] = useState(false);
    const isInbox = useRouter().pathname.startsWith('/[org]/inbox/[inboxView]');
    return (<>
      <LayeredHotkeys keys='f' callback={() => setFollowUpIsOpen(true)} options={{ enabled: !isInbox, skipEscapeWhenDisabled: true }}/>

      {!isInbox && <PostFollowUpDialog post={post} open={followUpIsOpen} onOpenChange={setFollowUpIsOpen}/>}

      <div className='flex min-w-0 flex-1 items-center gap-1.5'>
        <Link className='break-anywhere flex min-w-0 items-center gap-1 truncate' href={`/${scope}/projects/${post.project.id}`}>
          <ProjectAccessoryBreadcrumbIcon project={post.project}/>
          <BreadcrumbLabel>{post.project.name}</BreadcrumbLabel>
          {post.project.private && <LockIcon size={16} className='text-tertiary'/>}
        </Link>

        <UIText quaternary>/</UIText>
        <Link href={`/${scope}/posts/${post.id}`} className='break-anywhere min-w-0 truncate'>
          <BreadcrumbLabel className='ml-1'>{post.title || 'Untitled'}</BreadcrumbLabel>
        </Link>

        {post.viewer_is_organization_member && <PostFavoriteButton post={post} shortcutEnabled/>}
      </div>
    </>);
}
