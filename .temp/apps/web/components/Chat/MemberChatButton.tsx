import { OrganizationMember } from "../../../../packages/types/index.ts";
import { Button, ChatBubbleIcon } from "../../../../packages/ui/src/index.tsx";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
import { useScope } from "../../contexts/scope.tsx";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser.ts";
import { useIsCommunity } from "../../hooks/useIsCommunity.ts";
interface Props {
    member: OrganizationMember;
    fullWidth?: boolean;
}
export function MemberChatButton({ member, fullWidth = false }: Props) {
    const { scope } = useScope();
    const { data: currentUser } = useGetCurrentUser();
    const isCommunity = useIsCommunity();
    if (isCommunity)
        return null;
    if (currentUser?.id === member.user.id)
        return null;
    if (member.deactivated)
        return null;
    return (<Button className={cn(fullWidth && 'flex-none')} variant='flat' fullWidth={fullWidth} leftSlot={<ChatBubbleIcon />} disabled={false} href={`/${scope}/chat/new?username=${member.user.username}`}>
      Message
    </Button>);
}
