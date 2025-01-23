import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Attachment, OrganizationsOrgSlugThreadsPostRequest } from "../../../packages/types/index.ts";
import { usePusherSocketIdHeader } from "../contexts/pusher.tsx";
import { useScope } from "../contexts/scope.tsx";
import { apiErrorToast } from "../utils/apiErrorToast.ts";
import { apiClient, setTypedQueriesData, setTypedQueryData } from "../utils/queryClient.ts";
const postThreads = apiClient.organizations.postThreads();
const getThreads = apiClient.organizations.getThreads();
type Props = Omit<OrganizationsOrgSlugThreadsPostRequest, 'attachments'> & {
    attachments: Attachment[];
};
export function useCreateThread() {
    const queryClient = useQueryClient();
    const { scope } = useScope();
    const pusherSocketIdHeader = usePusherSocketIdHeader();
    return useMutation({
        mutationFn: (data: Props) => postThreads.request(`${scope}`, {
            ...data,
            attachments: data.attachments.map((a) => ({
                file_path: a.optimistic_file_path ?? '',
                preview_file_path: a.optimistic_preview_file_path ?? '',
                file_type: a.file_type,
                duration: a.duration,
                height: a.height,
                name: a.name,
                size: a.size,
                width: a.width
            }))
        }, { headers: pusherSocketIdHeader }),
        onSuccess: (thread) => {
            setTypedQueriesData(queryClient, getThreads.requestKey(`${scope}`), (old) => {
                if (!old)
                    return old;
                return {
                    ...old,
                    threads: [thread, ...old.threads]
                };
            });
            const getMembersByUsername = apiClient.organizations.getMembersByUsername();
            thread.other_members.forEach((member) => {
                setTypedQueryData(queryClient, getMembersByUsername.requestKey(`${scope}`, member.user.username), member);
            });
        },
        onError: apiErrorToast
    });
}
