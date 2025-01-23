import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { LayeredHotkeys } from "../../../../packages/ui/src/DismissibleLayer/index.tsx";
import { useGoBack } from "../Providers/HistoryProvider.tsx";
import { useIsSplitViewAvailable } from "../SplitView/hooks/index.ts";
import { selectedSplitViewSubjectAtom } from "../SplitView/utils/index.ts";
export function SubjectEspcapeLayeredHotkeys() {
    const goBack = useGoBack();
    const router = useRouter();
    const { isSplitViewAvailable } = useIsSplitViewAvailable();
    const setSelectedSplitViewSubject = useSetAtom(selectedSplitViewSubjectAtom);
    const isInbox = router.pathname.startsWith('/[org]/inbox/[inboxView]');
    return (<LayeredHotkeys keys='escape' callback={() => {
            if (isSplitViewAvailable) {
                setSelectedSplitViewSubject(undefined);
            }
            else {
                goBack();
            }
        }} options={{ enabled: !isInbox, skipEscapeWhenDisabled: true }}/>);
}
