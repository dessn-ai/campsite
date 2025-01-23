import { useState } from 'react';
import { DropdownMenu, DropdownMenuProps } from "../../../../packages/ui/src/DropdownMenu/index.tsx";
import { useIsDesktopApp } from "../../../../packages/ui/src/hooks/index.tsx";
import { LinkIcon, UserLinkIcon, VideoCameraBoltIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { desktopJoinCall } from "../../../../packages/ui/src/Link/index.tsx";
import { MenuItem } from "../../../../packages/ui/src/Menu/index.ts";
import { CallForLaterDialog } from "./CallForLaterDialog.tsx";
import { PersonalCallLinkDialog } from "./PersonalCallLinkDialog.tsx";
import { useCreateCallRoom } from "../../hooks/useCreateCallRoom.ts";
export function NewCallDropdownMenu(props: Omit<DropdownMenuProps, 'items'>) {
    const { mutate: createCallRoom } = useCreateCallRoom();
    const [callForLaterDialogOpen, setCallForLaterDialogOpen] = useState(false);
    const [personalCallLinkDialogOpen, setPersonalCallLinkDialogOpen] = useState(false);
    const isDesktop = useIsDesktopApp();
    const items: MenuItem[] = [
        {
            type: 'item',
            leftSlot: <VideoCameraBoltIcon />,
            label: 'Start an instant call',
            onSelect: () => {
                createCallRoom({ source: 'new_call_button' }, {
                    onSuccess: (data) => {
                        setTimeout(() => {
                            if (isDesktop) {
                                desktopJoinCall(`${data?.url}?im=open`);
                            }
                            else {
                                window.open(`${data?.url}?im=open`, '_blank');
                            }
                        });
                    }
                });
            }
        },
        {
            type: 'item',
            leftSlot: <LinkIcon />,
            label: 'Create call link',
            onSelect: () => {
                setCallForLaterDialogOpen(true);
            }
        },
        {
            type: 'item',
            leftSlot: <UserLinkIcon />,
            label: 'Use your personal call link',
            onSelect: () => {
                setPersonalCallLinkDialogOpen(true);
            }
        }
    ];
    return (<>
      <DropdownMenu items={items} desktop={{ width: 'w-[250px]' }} {...props}/>
      <CallForLaterDialog open={callForLaterDialogOpen} onOpenChange={setCallForLaterDialogOpen}/>
      <PersonalCallLinkDialog open={personalCallLinkDialogOpen} onOpenChange={setPersonalCallLinkDialogOpen}/>
    </>);
}
