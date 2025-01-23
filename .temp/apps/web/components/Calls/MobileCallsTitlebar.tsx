import { CallsIndexFilter } from "./CallsIndexFilter.tsx";
import { BreadcrumbTitlebar } from "../Titlebar/BreadcrumbTitlebar.tsx";
export function MobileCallsTitlebar() {
    return (<BreadcrumbTitlebar className='flex h-auto py-1.5 lg:hidden'>
      <div className='flex flex-1 items-center gap-1'>
        <CallsIndexFilter fullWidth/>
      </div>
    </BreadcrumbTitlebar>);
}
