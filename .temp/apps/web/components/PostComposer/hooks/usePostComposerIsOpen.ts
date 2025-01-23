import { useAtomValue } from 'jotai';
import { postComposerStateAtom } from "../utils/index.ts";
export function usePostComposerIsOpen() {
    const composerState = useAtomValue(postComposerStateAtom);
    return { isPostComposerOpen: !!composerState };
}
