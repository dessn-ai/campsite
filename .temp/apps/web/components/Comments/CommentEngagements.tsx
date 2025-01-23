import pluralize from 'pluralize';
import { Comment } from "../../../../packages/types/index.ts";
import { UIText } from "../../../../packages/ui/src/index.tsx";
import { CommentReactions } from "./CommentReactions.tsx";
import { useCommentHandleReactionSelect } from "./hooks/useCommentHandleReactionSelect.ts";
import { FollowUpPopover } from "../FollowUp/index.ts";
interface Props {
    comment: Comment;
    postId?: string;
    isOrganizationMember?: boolean;
}
export function CommentEngagements({ comment, postId, isOrganizationMember = true }: Props) {
    const handleReactionSelect = useCommentHandleReactionSelect({ comment, postId });
    if (!comment.grouped_reactions.length && !comment.follow_ups.length)
        return null;
    return (<div className='flex flex-col items-start gap-2 pt-1'>
      <CommentReactions comment={comment} onReactionSelect={handleReactionSelect}/>
      {isOrganizationMember && <CommentFollowUps comment={comment}/>}
    </div>);
}
function CommentFollowUps({ comment }: {
    comment: Comment;
}) {
    const followUpsCount = comment.follow_ups.length;
    if (followUpsCount === 0)
        return null;
    return (<FollowUpPopover modal side='top' align='start' followUps={comment.follow_ups}>
      <button type='button' className='text-quaternary dark:text-tertiary flex cursor-pointer items-center hover:underline'>
        <UIText inherit>
          {followUpsCount} {pluralize('follow-up', followUpsCount)}
        </UIText>
      </button>
    </FollowUpPopover>);
}
