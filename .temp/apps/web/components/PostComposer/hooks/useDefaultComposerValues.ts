import { useRouter } from 'next/router';
import { usePostComposerLastUsedProjectId } from "./usePostComposerLastUsedProjectId.ts";
import { useIsChatProjectRoute } from "../../../hooks/useIsChatProjectRoute.ts";
export function useDefaultComposerValues() {
    const routerProjectId = useRouter().query.projectId as string | undefined;
    const { isChatProject } = useIsChatProjectRoute();
    const { lastUsedProjectId } = usePostComposerLastUsedProjectId();
    return {
        defaultProjectId: (!isChatProject && routerProjectId) || lastUsedProjectId || undefined
    };
}
