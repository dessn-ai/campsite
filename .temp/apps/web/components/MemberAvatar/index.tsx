import { ComponentProps } from 'react';
import { SyncUser } from "../../../../packages/types/generated.ts";
import { Avatar } from "../../../../packages/ui/src/Avatar/index.tsx";
import { useUserIsOnline } from "../../hooks/useMemberIsOnline.ts";
type MemberAvatarUser = Pick<SyncUser, 'id' | 'display_name' | 'username' | 'avatar_urls' | 'notifications_paused' | 'integration'>;
export function MemberAvatar({ member, displayStatus = false, ...rest }: {
    displayStatus?: boolean;
    member: {
        deactivated?: boolean;
        user: MemberAvatarUser;
    };
} & ComponentProps<typeof Avatar>) {
    const isOnline = useUserIsOnline(member.user.id);
    return (<Avatar deactivated={member.deactivated} urls={member.user.avatar_urls} name={member.user.display_name} online={displayStatus ? isOnline : false} notificationsPaused={displayStatus ? member.user.notifications_paused : false} rounded={member.user.integration ? 'rounded' : 'rounded-full'} {...rest}/>);
}
