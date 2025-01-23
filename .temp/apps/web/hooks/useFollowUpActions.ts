import { useCallback } from 'react';
import { useCallbackRef } from "../../../packages/ui/src/hooks/index.tsx";
import { useCreateCallFollowUp } from "./useCreateCallFollowUp.ts";
import { useCreateNoteFollowUp } from "./useCreateNoteFollowUp.ts";
import { useDeleteCallFollowUp } from "./useDeleteCallFollowUp.ts";
import { useDeleteNoteFollowUp } from "./useDeleteNoteFollowUp.ts";
import { useUpdateFollowUp } from "./useUpdateFollowUp.ts";
import { normyTypeFromApiTypeName } from "../utils/optimisticFollowUps.ts";
import { useCreateCommentFollowUp } from "./useCreateCommentFollowUp.ts";
import { useCreatePostFollowUp } from "./useCreatePostFollowUp.ts";
import { useDeleteCommentFollowUp } from "./useDeleteCommentFollowUp.ts";
import { useDeletePostFollowUp } from "./useDeletePostFollowUp.ts";
type Props = {
    subject_id: string;
    subject_type: string;
    onCreate?: () => void;
};
export function useFollowUpActions({ subject_id, subject_type, onCreate }: Props) {
    const type = normyTypeFromApiTypeName(subject_type);
    const onCreateRef = useCallbackRef(onCreate);
    const { mutate: createPostFollowUp } = useCreatePostFollowUp();
    const { mutate: deletePostFollowUp } = useDeletePostFollowUp();
    const { mutate: createNoteFollowUp } = useCreateNoteFollowUp();
    const { mutate: deleteNoteFollowUp } = useDeleteNoteFollowUp();
    const { mutate: createCommentFollowUp } = useCreateCommentFollowUp();
    const { mutate: deleteCommentFollowUp } = useDeleteCommentFollowUp();
    const { mutate: createCallFollowUp } = useCreateCallFollowUp();
    const { mutate: deleteCallFollowUp } = useDeleteCallFollowUp();
    const { mutate: updateFollowUpMutation } = useUpdateFollowUp();
    const createFollowUp = useCallback(({ show_at }: {
        show_at: string;
    }) => {
        switch (type) {
            case 'post':
                return createPostFollowUp({ postId: subject_id, show_at }, { onSuccess: onCreateRef });
            case 'comment':
                return createCommentFollowUp({ commentId: subject_id, show_at }, { onSuccess: onCreateRef });
            case 'note':
                return createNoteFollowUp({ noteId: subject_id, show_at }, { onSuccess: onCreateRef });
            case 'call':
                return createCallFollowUp({ callId: subject_id, show_at }, { onSuccess: onCreateRef });
        }
    }, [type, createPostFollowUp, subject_id, onCreateRef, createCommentFollowUp, createNoteFollowUp, createCallFollowUp]);
    const deleteFollowUp = useCallback(({ id }: {
        id: string;
    }) => {
        switch (type) {
            case 'post':
                return deletePostFollowUp({ postId: subject_id, id });
            case 'comment':
                return deleteCommentFollowUp({ commentId: subject_id, id });
            case 'note':
                return deleteNoteFollowUp({ noteId: subject_id, id });
            case 'call':
                return deleteCallFollowUp({ callId: subject_id, id });
        }
    }, [type, deletePostFollowUp, subject_id, deleteCommentFollowUp, deleteNoteFollowUp, deleteCallFollowUp]);
    const updateFollowUp = useCallback(({ id, show_at }: {
        id: string;
        show_at: string;
    }) => {
        return updateFollowUpMutation({ id, subjectId: subject_id, subjectType: subject_type, show_at });
    }, [updateFollowUpMutation, subject_id, subject_type]);
    return { createFollowUp, deleteFollowUp, updateFollowUp };
}
