import { useAtom } from 'jotai';
import { Button } from "../../../../../packages/ui/src/Button/index.tsx";
import { SidebarIcon } from "../../../../../packages/ui/src/Icons/index.tsx";
import { isDesktopProjectSidebarOpenAtom, isMobileProjectSidebarOpenAtom } from "../utils/index.ts";
export function ProjectSidebarDesktopToggleButton() {
    const [isDesktopProjectSidebarOpen, setIsDesktopProjectSidebarOpen] = useAtom(isDesktopProjectSidebarOpenAtom);
    return (<Button size='sm' iconOnly={<SidebarIcon />} accessibilityLabel={isDesktopProjectSidebarOpen ? 'Close sidebar' : 'Open sidebar'} onClick={() => setIsDesktopProjectSidebarOpen((prev) => !prev)} tooltip={isDesktopProjectSidebarOpen ? 'Close' : 'Open'} tooltipShortcut=']' variant={isDesktopProjectSidebarOpen ? 'flat' : 'plain'}/>);
}
export function ProjectSidebarMobileToggleButton() {
    const [isMobileProjectSidebarOpen, setIsMobileProjectSidebarOpen] = useAtom(isMobileProjectSidebarOpenAtom);
    return (<Button size='sm' iconOnly={<SidebarIcon />} accessibilityLabel={isMobileProjectSidebarOpen ? 'Close sidebar' : 'Open sidebar'} onClick={() => setIsMobileProjectSidebarOpen((prev) => !prev)} tooltip={isMobileProjectSidebarOpen ? 'Close' : 'Open'} tooltipShortcut=']' variant={isMobileProjectSidebarOpen ? 'flat' : 'plain'}/>);
}
