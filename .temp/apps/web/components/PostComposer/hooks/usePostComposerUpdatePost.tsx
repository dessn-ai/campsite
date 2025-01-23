import { useCallback } from 'react';
import { PostSchema } from "../../Post/schema.ts";
import { usePostComposerIsEditingPost } from "./usePostComposerIsEditingPost.ts";
import { useCreatePoll } from "../../../hooks/useCreatePoll.ts";
import { useDeletePoll } from "../../../hooks/useDeletePoll.ts";
import { useUpdatePoll } from "../../../hooks/useUpdatePoll.ts";
import { useUpdatePost } from "../../../hooks/useUpdatePost.ts";
import { trimHtml } from "../../../utils/trimHtml.ts";
export function usePostComposerUpdatePost() {
    const { initialPost } = usePostComposerIsEditingPost();
    const postId = initialPost?.id ?? '';
    const { mutateAsync: updatePost } = useUpdatePost();
    const { mutateAsync: createPoll } = useCreatePoll({ postId });
    const { mutateAsync: updatePoll } = useUpdatePoll({ postId });
    const { mutateAsync: deletePoll } = useDeletePoll({ postId });
    return useCallback(async function ({ editorHTML, data }: {
        editorHTML: string;
        data: PostSchema;
    }) {
        if (!postId)
            return;
        const hasRequestFeedback = data.status === 'feedback_requested';
        // MARK: - Data
        // Update the base post data
        const post = await updatePost({
            ...data,
            description_html: trimHtml(editorHTML),
            id: postId,
            project_id: data.project_id,
            feedback_request_member_ids: hasRequestFeedback
                ? (data.feedback_requests?.map((fr) => fr.member.id) ?? [])
                : [],
            attachment_ids: data.attachment_ids
        });
        // MARK: - Polls
        if (!post.poll && data.poll) {
            await createPoll(data.poll);
        }
        else if (post.poll && !data.poll) {
            await deletePoll();
        }
        else if (post.poll && data.poll) {
            await updatePoll({
                ...data.poll,
                options: data.poll.options.map((o) => (o.new ? { description: o.description } : o))
            });
        }
    }, [postId, createPoll, deletePoll, updatePoll, updatePost]);
}
