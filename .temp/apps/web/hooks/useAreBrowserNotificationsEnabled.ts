import { isAndroid, isChrome, isChromium, isOpera, isSamsungBrowser } from 'react-device-detect';
import { useIsDesktopApp } from "../../../packages/ui/src/hooks/index.tsx";
import { useIsPWA } from "./useIsPWA.ts";
export function useAreBrowserNotificationsEnabled() {
    const isDesktop = useIsDesktopApp();
    const isPwa = useIsPWA();
    // https://caniuse.com/mdn-api_notification
    const onlySupportsNotificationsInServiceWorkers = isAndroid && (isChrome || isChromium || isSamsungBrowser || isOpera);
    return (!isDesktop &&
        !isPwa &&
        !onlySupportsNotificationsInServiceWorkers &&
        'Notification' in window &&
        Notification.permission === 'granted');
}
