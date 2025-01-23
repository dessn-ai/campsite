import { useAtom } from 'jotai';
import { Button, Link } from "../../../../packages/ui/src/index.tsx";
import { InvitePeopleButton } from "./InvitePeopleButton.tsx";
import { rootFilterAtom } from "./PeopleIndex.tsx";
import { PeopleBreadcrumbIcon } from "../Titlebar/BreadcrumbPageIcons.tsx";
import { BreadcrumbLabel, BreadcrumbTitlebar } from "../Titlebar/BreadcrumbTitlebar.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useViewerIsAdmin } from "../../hooks/useViewerIsAdmin.ts";
import { PeopleRootFilter } from "./PeopleRootFilter.tsx";
export function PeopleTitlebar() {
    const { scope } = useScope();
    return (<BreadcrumbTitlebar>
      <Link draggable={false} href={`/${scope}`} className='flex items-center gap-3'>
        <PeopleBreadcrumbIcon />
        <BreadcrumbLabel>People</BreadcrumbLabel>
      </Link>
      <PeopleRootFilter />

      <div className='flex-1'/>

      <InvitePeopleButton />
    </BreadcrumbTitlebar>);
}
export function MobilePeopleTitlebar() {
    const [rootFilter, setRootFilter] = useAtom(rootFilterAtom);
    const viewerIsAdmin = useViewerIsAdmin();
    if (!viewerIsAdmin)
        return null;
    return (<BreadcrumbTitlebar className='flex h-auto gap-1 py-1.5 lg:hidden'>
      <Button fullWidth onClick={() => setRootFilter('active')} variant={rootFilter === 'active' ? 'flat' : 'plain'}>
        Active
      </Button>
      <Button fullWidth onClick={() => setRootFilter('invited')} variant={rootFilter === 'invited' ? 'flat' : 'plain'}>
        Invited
      </Button>
      <Button fullWidth onClick={() => setRootFilter('deactivated')} variant={rootFilter === 'deactivated' ? 'flat' : 'plain'}>
        Deactivated
      </Button>
    </BreadcrumbTitlebar>);
}
