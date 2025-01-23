import { Post } from "../../../../packages/types/index.ts";
import { useCreatePostFollowUp } from "../../hooks/useCreatePostFollowUp.ts";
import { useDeletePostFollowUp } from "../../hooks/useDeletePostFollowUp.ts";
import { FollowUpDropdown, FollowUpDropdownRef } from "../FollowUp/index.ts";
interface InlinePostFollowUpDropdownProps extends React.PropsWithChildren {
    post: Post;
    followUpRef?: React.RefObject<FollowUpDropdownRef>;
}
export function InlinePostFollowUpDropdown({ children, post, followUpRef }: InlinePostFollowUpDropdownProps) {
    const createFollowUp = useCreatePostFollowUp();
    const deleteFollowUp = useDeletePostFollowUp();
    return (<FollowUpDropdown ref={followUpRef} followUps={post.follow_ups} onCreate={({ show_at }) => createFollowUp.mutate({ postId: post.id, show_at })} onDelete={({ id }) => deleteFollowUp.mutate({ postId: post.id, id })} align='end'>
      {children}
    </FollowUpDropdown>);
}
