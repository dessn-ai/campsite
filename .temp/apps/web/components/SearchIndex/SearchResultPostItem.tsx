import React from 'react';
import { format } from 'date-fns';
import { SearchPost } from "../../../../packages/types/index.ts";
import { Link, UIText } from "../../../../packages/ui/src/index.tsx";
import { HTMLRenderer } from "../HTMLRenderer/index.tsx";
import { MemberHovercard } from "../InlinePost/MemberHovercard.tsx";
import { MemberAvatar } from "../MemberAvatar/index.tsx";
import { ProjectTag } from "../ProjectTag.tsx";
import { SearchHighlights } from "./SearchHighlights.tsx";
import { ItemProps } from "./SearchIndex.tsx";
import { SearchResult } from "./SearchResult.tsx";
import { useScope } from "../../contexts/scope.tsx";
interface SearchResultPostItemProps extends ItemProps {
    post: SearchPost;
}
export function SearchResultPostItem({ post, highlights, titleHighlight, ...rest }: SearchResultPostItemProps) {
    const { scope } = useScope();
    const title = titleHighlight ?? post.title;
    const description = post.truncated_description_text;
    return (<SearchResult href={`/${scope}/posts/${post.id}`} id={post.id} className={!highlights?.length ? 'items-center' : 'items-start'} {...rest}>
      <div className='mt-0.5 flex items-start'>
        <MemberHovercard username={post.member.user.username as string}>
          <Link tabIndex={-1} className='not-prose rounded-full' href={`/${scope}/people/${post.member.user.username}`}>
            <MemberAvatar member={post.member} size='sm'/>
          </Link>
        </MemberHovercard>
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-1 items-center gap-3'>
          <div className='flex flex-1 flex-col gap-0.5'>
            <div className='@xl:flex-row @xl:items-center flex flex-col'>
              {title && (<UIText primary weight='font-medium' className='break-anywhere mr-2 line-clamp-1'>
                  <HTMLRenderer text={title}/>
                </UIText>)}

              {!title && description && (<UIText secondary className='break-anywhere mr-2 line-clamp-1'>
                  {description}
                </UIText>)}

              <UIText quaternary className='break-anywhere line-clamp-1'>
                {format(post.created_at, 'MMM d, yyyy')}
              </UIText>
            </div>
            <SearchHighlights highlights={highlights}/>
          </div>

          <div className='hidden items-center gap-1 self-start pt-0.5 md:flex'>
            {post.project && <ProjectTag tabIndex={-1} project={post.project}/>}
          </div>
        </div>
      </div>
    </SearchResult>);
}
