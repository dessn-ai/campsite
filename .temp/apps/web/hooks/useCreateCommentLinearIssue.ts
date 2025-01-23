import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { OrganizationPostLinearIssuesPostRequest, PostCommentsLinearIssuesData } from "../../../packages/types/index.ts";
import { useCallbackRef } from "../../../packages/ui/src/hooks/index.tsx";
import { useScope } from "../contexts/scope.tsx";
import { useBindCurrentUserEvent } from "./useBindCurrentUserEvent.ts";
import { apiClient } from "../utils/queryClient.ts";
const createCommentIssue = apiClient.organizations.postCommentsLinearIssues();
export function useCreateCommentLinearIssue({ commentId, onStatusChange }: {
    commentId: string;
    onStatusChange: (data: PostCommentsLinearIssuesData) => void;
}) {
    const { scope } = useScope();
    const [status, setStatus] = useState<PostCommentsLinearIssuesData['status'] | null>(null);
    const handleStatusChange = useCallbackRef(onStatusChange);
    const updateOnStatusChange = useCallback((data: PostCommentsLinearIssuesData) => {
        setStatus(data.status);
        handleStatusChange(data);
    }, [handleStatusChange]);
    // NOTE: the server matches this event name pattern
    let eventName = `linear-issue-create:Comment:${commentId}`;
    useBindCurrentUserEvent(eventName, updateOnStatusChange);
    const createIssue = useMutation({
        mutationFn: (data: OrganizationPostLinearIssuesPostRequest) => createCommentIssue.request(`${scope}`, commentId, data),
        onSuccess: (res) => {
            setStatus(res.status);
        }
    });
    const resetStatus = useCallback(() => {
        setStatus(null);
    }, []);
    return { createIssue, status, resetStatus };
}
