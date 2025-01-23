import { ComponentProps, PropsWithChildren } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { isMacOs } from 'react-device-detect';
import { Button, SidebarIcon, UIText } from "../../../../packages/ui/src/index.tsx";
import { useIsDesktopApp } from "../../../../packages/ui/src/hooks/index.tsx";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
import { DesktopAppNavigationButtons } from "../DesktopAppNavigationButtons.tsx";
import { sidebarCollapsedAtom } from "../Layout/AppLayout.tsx";
export function BreadcrumbTitlebarContainer({ children, className, hideSidebarToggle = false }: PropsWithChildren & {
    className?: string;
    hideSidebarToggle?: boolean;
}) {
    const isDesktopApp = useIsDesktopApp();
    const sidebarCollapsed = useAtomValue(sidebarCollapsedAtom);
    return (<div className={cn('bg-primary sticky top-0 z-10 hidden h-[--navbar-height] flex-none items-center gap-3 border-b px-3.5 lg:flex', className, {
            'pl-21 lg:pl-21': isDesktopApp && sidebarCollapsed && isMacOs && !hideSidebarToggle
        })}>
      {children}
    </div>);
}
export function BreadcrumbTitlebar({ children, className, hideSidebarToggle = false }: PropsWithChildren & {
    className?: string;
    hideSidebarToggle?: boolean;
}) {
    const isDesktopApp = useIsDesktopApp();
    const [sidebarCollapsed, setSidebarCollapsed] = useAtom(sidebarCollapsedAtom);
    return (<BreadcrumbTitlebarContainer className={className} hideSidebarToggle={hideSidebarToggle}>
      {!isDesktopApp && sidebarCollapsed && !hideSidebarToggle && (<div className='flex items-center gap-0.5'>
          {sidebarCollapsed && (<Button iconOnly={<span className='scale-x-flip'>
                  <SidebarIcon />
                </span>} accessibilityLabel='Toggle sidebar visibility' variant='plain' 
            // prevent focusing this button when clicked, since we keep the sidebar visible if there are any focusable elements inside
            onMouseDown={(e) => e.preventDefault()} onClick={() => setSidebarCollapsed(false)} tooltip='Open' tooltipShortcut='['/>)}
        </div>)}

      {isDesktopApp && sidebarCollapsed && !hideSidebarToggle && (<div className='flex items-center gap-0.5'>
          <Button iconOnly={<span className='scale-x-flip text-secondary'>
                <SidebarIcon />
              </span>} accessibilityLabel='Toggle sidebar visibility' variant='plain' 
        // prevent focusing this button when clicked, since we keep the sidebar visible if there are any focusable elements inside
        onMouseDown={(e) => e.preventDefault()} onClick={() => setSidebarCollapsed(false)}/>

          {isMacOs && (<div className='flex items-center gap-0.5'>
              <DesktopAppNavigationButtons />
            </div>)}
        </div>)}

      {children}
    </BreadcrumbTitlebarContainer>);
}
export function BreadcrumbLabel({ children, className, ...rest }: ComponentProps<'p'> & {
    children: React.ReactNode;
    className?: string;
}) {
    return (<UIText className={cn('break-anywhere min-w-0 max-w-[32ch] truncate text-[15px] leading-tight', className)} weight='font-medium' {...rest}>
      {children}
    </UIText>);
}
