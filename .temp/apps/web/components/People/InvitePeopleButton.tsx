import { useState } from 'react';
import { Button, ButtonProps } from "../../../../packages/ui/src/Button/index.tsx";
import { PlusIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { CommunityInviteDialog } from "../JoinCommunity/CommunityInviteDialog.tsx";
import { InvitePeopleDialog } from "./InvitePeopleDialog.tsx";
import { useGetCurrentOrganization } from "../../hooks/useGetCurrentOrganization.ts";
import { useIsCommunity } from "../../hooks/useIsCommunity.ts";
export function InvitePeopleButton({ variant = 'primary', label = 'Invite people', fullWidth = false, leftSlot = <PlusIcon size={16} strokeWidth='2'/>, size = 'base' }: {
    variant?: ButtonProps['variant'];
    label?: string;
    fullWidth?: boolean;
    leftSlot?: React.ReactNode;
    size?: ButtonProps['size'];
}) {
    const [open, onOpenChange] = useState(false);
    const isCommunity = useIsCommunity();
    const { data: currentOrganization } = useGetCurrentOrganization();
    if (!currentOrganization?.viewer_can_create_invitation)
        return null;
    if (isCommunity) {
        return (<>
        <CommunityInviteDialog open={open} onOpenChange={onOpenChange}/>
        <Button size={size} fullWidth={fullWidth} variant={variant} onClick={() => {
                onOpenChange(true);
            }}>
          {label}
        </Button>
      </>);
    }
    return (<>
      <InvitePeopleDialog open={open} onOpenChange={onOpenChange}/>
      <Button size={size} leftSlot={leftSlot} fullWidth={fullWidth} onClick={() => onOpenChange(true)} variant={variant}>
        {label}
      </Button>
    </>);
}
