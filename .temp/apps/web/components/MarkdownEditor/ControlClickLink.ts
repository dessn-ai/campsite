import { useMemo } from 'react';
import { EditorView } from '@tiptap/pm/view';
import { specialLinkClickHandler } from "../../../../packages/ui/src/Link/index.tsx";
import { useScope } from "../../contexts/scope.tsx";
export function useControlClickLink() {
    const { scope } = useScope();
    return useMemo(() => ({
        onClick(view: EditorView, event: MouseEvent) {
            return specialLinkClickHandler(`${scope}`, event, view.editable);
        }
    }), [scope]);
}
