import { cn } from "../../../../packages/ui/src/index.tsx";
import { InlinePostActor } from "../InlinePost/InlinePostActor.tsx";
import { useGetPost } from "../../hooks/useGetPost.ts";
import { GroupedAttachments } from "../GroupedAttachments.tsx";
import { InlinePostContentGrid, InlinePostGrid } from "../InlinePost/index.tsx";
import { InlinePostByline } from "../InlinePost/InlinePostByline.tsx";
import { InlinePostContainer } from "../InlinePost/InlinePostContainer.tsx";
import { InlinePostContent } from "../InlinePost/InlinePostContent.tsx";
import { InlinePostEngagements } from "../InlinePost/InlinePostEngagements.tsx";
import { InlinePostPoll } from "../InlinePost/InlinePostPoll.tsx";
import { InlinePostTags } from "../InlinePost/InlinePostTags.tsx";
import { InlinePostTitle } from "../InlinePost/InlinePostTitle.tsx";
import { InlinePostVersionStatus } from "../InlinePost/InlinePostVersionStatus.tsx";
import { InlinePostTombstone } from "../InlinePost/Tombstone.tsx";
interface PostPreviewCardProps {
    className?: string;
    postId: string;
}
export function PostPreviewCard({ className, postId }: PostPreviewCardProps) {
    const display = 'preview';
    const { data: post, isError } = useGetPost({ postId });
    if (isError) {
        return <InlinePostTombstone />;
    }
    if (!post) {
        return (<div className={cn('bg-primary dark:bg-secondary relative min-h-24 w-full overflow-hidden rounded-lg border', className)}/>);
    }
    return (<InlinePostContainer postId={postId} display={display} className={cn('border-primary-opaque max-w-lg flex-1 rounded-lg border px-3 py-2.5', className)} interactive={false}>
      <InlinePostVersionStatus display={display} post={post}/>

      <InlinePostGrid display={display}>
        <InlinePostActor display={display} post={post}/>
        <InlinePostByline overflowMenu={false} display={display} post={post}/>

        <InlinePostContentGrid display={display}>
          <InlinePostTitle post={post} display={display}/>
          <InlinePostContent display={display} post={post}/>
          <InlinePostPoll post={post}/>
          <GroupedAttachments postId={post.id} content={post.description_html} truncatedContent={post.truncated_description_html} attachments={post.attachments} display={display} autoPlayVideo={false}/>

          <InlinePostTags post={post}/>

          <InlinePostEngagements post={post} display={display}/>
        </InlinePostContentGrid>
      </InlinePostGrid>
    </InlinePostContainer>);
}
