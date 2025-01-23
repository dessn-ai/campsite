import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { useIsDesktopApp } from "../../../../packages/ui/src/hooks/index.tsx";
import { UIText } from "../../../../packages/ui/src/Text/index.tsx";
import { useCreateDesktopOrBrowserNotification } from "../../hooks/useCreateDesktopOrBrowserNotification.tsx";
import { useIsPWA } from "../../hooks/useIsPWA.ts";
export function BrowserNotificationsUpsell() {
    const isPwa = useIsPWA();
    const isDesktop = useIsDesktopApp();
    const createDesktopOrBrowserNotification = useCreateDesktopOrBrowserNotification();
    if (isDesktop || isPwa || !('Notification' in window) || Notification.permission !== 'default')
        return null;
    function onClick() {
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
                createDesktopOrBrowserNotification({
                    title: 'Subscribed to notifications',
                    body: 'Push notifications enabled.',
                    tag: 'notifications-enabled'
                });
            }
        });
    }
    return (<div className='bg-elevated mb-2 flex flex-col gap-2 rounded-lg border p-3'>
      <UIText size='text-xs' secondary className='text-balance'>
        Campsite needs your permission to enable notifications.
      </UIText>
      <Button size='sm' variant='important' onClick={onClick}>
        Enable notifications
      </Button>
    </div>);
}
