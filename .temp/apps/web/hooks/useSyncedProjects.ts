import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { SyncProject } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { atomWithWebStorage } from "../utils/atomWithWebStorage.ts";
import { apiClient } from "../utils/queryClient.ts";
const syncedProjectsAtom = atomFamily((scope: string) => atomWithWebStorage<SyncProject[]>(`projects:sync:${scope}`, []));
const getSyncProjects = apiClient.organizations.getSyncProjects();
interface Props {
    enabled?: boolean;
    includeArchived?: boolean;
    includeProjectId?: string;
    excludeChatProjects?: boolean;
}
export function useSyncedProjects({ enabled = true, includeArchived = false, includeProjectId, excludeChatProjects = false }: Props = {}) {
    const { scope } = useScope();
    const [projects, setProjects] = useAtom(syncedProjectsAtom(`${scope}`));
    const { refetch } = useQuery({
        queryKey: getSyncProjects.requestKey(`${scope}`),
        queryFn: async () => {
            const results = await getSyncProjects.request(`${scope}`);
            setProjects(results);
            return results;
        },
        enabled: !!scope && enabled
    });
    const filtered = useMemo(() => projects.filter((project) => {
        if (project.id === includeProjectId) {
            return true;
        }
        if (excludeChatProjects && project.message_thread_id) {
            return false;
        }
        if (!includeArchived && project.archived) {
            return false;
        }
        return true;
    }), [projects, excludeChatProjects, includeArchived, includeProjectId]);
    return { projects: filtered, refetch };
}
