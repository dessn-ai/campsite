import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { isDesktopProjectSidebarOpenAtom } from "../../Projects/utils/index.ts";
import { debouncedSelectedSplitViewSubjectAtom } from "../utils/index.ts";
export function useIsSplitViewVisible() {
    const router = useRouter();
    const isProject = router.pathname === '/[org]/projects/[projectId]' ||
        router.pathname === '/[org]/projects/[projectId]/docs' ||
        router.pathname === '/[org]/projects/[projectId]/calls';
    const isDesktopProjectSidebarOpen = useAtomValue(isDesktopProjectSidebarOpenAtom);
    const debouncedSelectedSplitViewSubject = useAtomValue(debouncedSelectedSplitViewSubjectAtom);
    return { isSplitViewVisible: (isProject && isDesktopProjectSidebarOpen) || !!debouncedSelectedSplitViewSubject };
}
