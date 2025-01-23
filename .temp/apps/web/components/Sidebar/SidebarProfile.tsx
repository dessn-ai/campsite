import { useSetAtom } from 'jotai';
import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { QuestionMarkCircleIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { setFeedbackDialogOpenAtom } from "../Feedback/FeedbackDialog.tsx";
import { MemberAvatar } from "../MemberAvatar/index.tsx";
import { ChangelogDropdown } from "../NavigationSidebar/ChangelogDropdown.tsx";
import { ProfileDropdown } from "../NavigationSidebar/ProfileDropdown.tsx";
import { StatusPicker } from "../StatusPicker.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser.ts";
export function SidebarProfile() {
    const { scope } = useScope();
    const { data: currentUser } = useGetCurrentUser();
    const setFeedbackDialogOpen = useSetAtom(setFeedbackDialogOpenAtom);
    return (<div className='flex items-center gap-px'>
      <div className='flex items-center gap-1'>
        <ProfileDropdown trigger={<Button round variant='plain' href={`/${scope}/people/${currentUser?.username}`} accessibilityLabel='Profile and settings' tooltip='Profile and settings' iconOnly={currentUser && <MemberAvatar displayStatus member={{ user: currentUser }} size='sm'/>}/>} align='start' side='top'/>
        <StatusPicker />
      </div>

      {/* spacer */}
      <div className='flex-1'/>

      <Button variant='plain' iconOnly={<QuestionMarkCircleIcon />} accessibilityLabel='Share feedback' tooltip='Share feedback' onClick={() => setFeedbackDialogOpen(true)} className='text-tertiary hover:text-primary'/>

      <ChangelogDropdown align='start' side='bottom'/>
    </div>);
}
