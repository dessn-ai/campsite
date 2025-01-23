import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Command } from "../../../../packages/ui/src/Command/index.ts";
import { lastUsedSubjectAtom } from "../Post/PostNavigationButtons.tsx";
import { useIsSplitViewAvailable } from "../SplitView/hooks/index.ts";
import { debouncedSelectedSplitViewSubjectAtom, selectedSplitViewSubjectAtom } from "../SplitView/utils/index.ts";
import { decodeCommandListSubject, encodeCommandListSubject } from "../../utils/commandListSubject.ts";
interface SubjectCommandProps extends React.PropsWithChildren {
}
export function SubjectCommand({ children }: SubjectCommandProps) {
    const lastUsedSubject = useAtomValue(lastUsedSubjectAtom);
    const selectedSplitViewSubject = useAtomValue(selectedSplitViewSubjectAtom);
    const setDebouncedSelectedSplitViewSubject = useSetAtom(debouncedSelectedSplitViewSubjectAtom);
    const { isSplitViewAvailable } = useIsSplitViewAvailable();
    // Reset split view selection when navigating away from the page
    useEffect(() => {
        return () => {
            setDebouncedSelectedSplitViewSubject(undefined);
        };
    }, [setDebouncedSelectedSplitViewSubject]);
    return (<Command className='flex flex-1' focusSelection disableAutoSelect {...(!isSplitViewAvailable
        ? { defaultValue: lastUsedSubject ? encodeCommandListSubject(lastUsedSubject) : undefined }
        : {
            value: selectedSplitViewSubject ? encodeCommandListSubject(selectedSplitViewSubject) : '',
            onValueChange: (val, event) => {
                if (event?.metaKey || event?.shiftKey) {
                    return;
                }
                setDebouncedSelectedSplitViewSubject(decodeCommandListSubject(val));
            },
            disablePointerSelection: true
        })}>
      {children}
    </Command>);
}
