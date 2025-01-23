import { useState } from 'react';
import { useRouter } from 'next/router';
import { InboxIcon } from "../../../../packages/ui/src/index.tsx";
import { defaultInboxView } from "../InboxItems/InboxSplitView.tsx";
import { useRefetchInboxIndex } from "../NavigationBar/useNavigationTabAction.ts";
import { useScope } from "../../contexts/scope.tsx";
import { useGetNotifications } from "../../hooks/useGetNotifications.ts";
import { useGetUnreadNotificationsCount } from "../../hooks/useGetUnreadNotificationsCount.ts";
import { InboxHoverCard } from "../InboxItems/InboxHoverCard.tsx";
import { SidebarLink } from "./SidebarLink.tsx";
import { SidebarUnreadBadge } from "./SidebarUnreadBadge.tsx";
export function SidebarInbox() {
    const router = useRouter();
    const { scope } = useScope();
    const getUnreadNotificationsCount = useGetUnreadNotificationsCount();
    const unreadInboxCount = getUnreadNotificationsCount.data?.home_inbox[`${scope}`] || 0;
    const refetchInbox = useRefetchInboxIndex();
    const [prefetch, setPrefetch] = useState(false);
    useGetNotifications({ filter: 'home', enabled: prefetch });
    const unread = unreadInboxCount > 0;
    return (<InboxHoverCard>
      <SidebarLink id='inbox' label='Inbox' href={`/${scope}/inbox/${defaultInboxView}`} active={router.pathname.startsWith('/[org]/inbox/[inboxView]')} leadingAccessory={<InboxIcon />} unread={unread} trailingAccessory={unreadInboxCount > 0 && <SidebarUnreadBadge important={false}>{unreadInboxCount}</SidebarUnreadBadge>} onClick={() => {
            refetchInbox();
        }} onMouseEnter={() => setPrefetch(true)} onMouseLeave={() => setPrefetch(false)}/>
    </InboxHoverCard>);
}
