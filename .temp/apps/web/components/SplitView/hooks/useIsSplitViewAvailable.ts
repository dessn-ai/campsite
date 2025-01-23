import { useRouter } from 'next/router';
import { useBreakpoint } from "../../../../../packages/ui/src/hooks/index.tsx";
import { useCurrentUserOrOrganizationHasFeature } from "../../../hooks/useCurrentUserOrOrganizationHasFeature.ts";
import { useIsChatProjectRoute } from "../../../hooks/useIsChatProjectRoute.ts";
import { usePostsDisplayPreference } from "../../../hooks/usePostsDisplayPreference.ts";
export function useIsSplitViewAvailable() {
    const router = useRouter();
    const isLg = useBreakpoint('lg');
    const { isChatProject } = useIsChatProjectRoute();
    const displayPreference = usePostsDisplayPreference();
    const hasComfyCompactLayout = useCurrentUserOrOrganizationHasFeature('comfy_compact_layout');
    const isComfortable = !hasComfyCompactLayout &&
        displayPreference === 'comfortable' &&
        (router.pathname === '/[org]/projects/[projectId]' || router.pathname === '/[org]/posts');
    const isProject = router.pathname === '/[org]/projects/[projectId]' ||
        router.pathname === '/[org]/projects/[projectId]/docs' ||
        router.pathname === '/[org]/projects/[projectId]/calls';
    const isCalls = router.pathname === '/[org]/calls';
    const isNotes = router.pathname === '/[org]/notes';
    const isPosts = router.pathname === '/[org]/posts';
    const isValidRoute = (() => {
        if (isComfortable || isChatProject)
            return false;
        return isProject || isCalls || isNotes || isPosts;
    })();
    return { isSplitViewAvailable: isLg && isValidRoute };
}
