import atomWithDebounce from "../../../utils/atomWithDebounce.ts";
import { CommandListSubject } from "../../../utils/commandListSubject.ts";
const { currentValueAtom: selectedSplitViewSubjectAtom, debouncedValueAtom: debouncedSelectedSplitViewSubjectAtom } = atomWithDebounce<CommandListSubject | undefined>(undefined, 200);
export { selectedSplitViewSubjectAtom, debouncedSelectedSplitViewSubjectAtom };
