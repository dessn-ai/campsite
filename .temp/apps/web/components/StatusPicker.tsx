import { useState } from 'react';
import { Button } from "../../../packages/ui/src/index.tsx";
import { UpdateStatusDialog } from "./Home/UpdateStatusDialog.tsx";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser.ts";
import { useGetOrganizationMember } from "../hooks/useGetOrganizationMember.ts";
import { MemberStatus } from "./MemberStatus.tsx";
export function StatusPicker() {
    const { data: currentUser } = useGetCurrentUser();
    const { data: member } = useGetOrganizationMember({ username: currentUser?.username ?? '', enabled: true });
    const [open, setOpen] = useState(false);
    return (<>
      <UpdateStatusDialog open={open} onOpenChange={setOpen}/>
      <Button className='text-tertiary hover:text-primary' variant='plain' tooltip='Change status' accessibilityLabel='Change status' iconOnly={<MemberStatus asTrigger status={member?.status} disabled={open}/>} onClick={() => setOpen(true)}/>
    </>);
}
