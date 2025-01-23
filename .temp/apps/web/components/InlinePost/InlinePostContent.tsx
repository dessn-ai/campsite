import { useRef } from 'react';
import { Post } from "../../../../packages/types/index.ts";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
import { EMPTY_HTML } from "../../atoms/markdown.ts";
import { DisplayType } from "./index.tsx";
import { InlinePostRenderer } from "./InlinePostRenderer.tsx";
import { PostLink } from "../Post/PostLink.tsx";
import { useUpdatePostTaskList } from "../../hooks/useUpdatePostTaskList.ts";
import { AutoBlockquoteReply } from "./AutoBlockquoteReply.tsx";
import { MentionInteractivity } from "./MemberHovercard.tsx";
interface InlinePostContentProps {
    post: Post;
    display: DisplayType;
}
export function InlinePostContent({ post, display }: InlinePostContentProps) {
    const updateTaskList = useUpdatePostTaskList(post.id);
    const postContentRef = useRef<HTMLDivElement>(null);
    if (!post)
        return null;
    // placeholder div so that our flex gap creates space between the byline and attachments for posts without a description
    if (!post.description_html || post.description_html === EMPTY_HTML)
        return <div className='min-h-4'/>;
    const shouldTruncate = display !== 'page';
    const html = shouldTruncate ? post.truncated_description_html : post.description_html;
    return (<div className={cn({
            'mt-1': display === 'feed' || display === 'preview',
            'mt-2': display === 'page' || !!post.title
        })}>
      <AutoBlockquoteReply post={post} enabled={display === 'page'}>
        <MentionInteractivity container={postContentRef}/>

        <InlinePostRenderer postId={post.id} content={html} onCheckboxClick={updateTaskList.mutate}/>

        {shouldTruncate && post.is_text_content_truncated && (<PostLink postId={post.id} className='text-primary mt-3 text-left text-[15px] font-medium hover:underline'>
            Read more &rarr;
          </PostLink>)}
      </AutoBlockquoteReply>
    </div>);
}
