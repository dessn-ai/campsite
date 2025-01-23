import { useAtomValue } from 'jotai';
import { filterAtom, NoteIndexFilterType, sortAtom } from "./NotesIndexDisplayDropdown.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useGetCurrentMemberNotes } from "../../hooks/useGetCurrentMemberNotes.ts";
import { useGetForMeNotes } from "../../hooks/useGetForMeNotes.ts";
import { useGetNotes } from "../../hooks/useGetNotes.tsx";
interface Props {
    enabled?: boolean;
    localFilter?: NoteIndexFilterType;
    query?: string;
}
export function useGetNotesIndex({ localFilter, query, enabled = true }: Props = {}) {
    const { scope } = useScope();
    const globalFilter = useAtomValue(filterAtom(scope));
    const filter = localFilter ?? globalFilter;
    const sort = useAtomValue(sortAtom({ scope, filter }));
    const getForMeNotes = useGetForMeNotes({
        enabled: enabled && filter === 'for-me',
        order: { by: sort, direction: 'desc' },
        query
    });
    const getAllNotes = useGetNotes({
        enabled: enabled && filter === 'all',
        order: { by: sort, direction: 'desc' },
        query
    });
    const getCurrentMemberNotes = useGetCurrentMemberNotes({
        enabled: enabled && filter === 'created',
        order: { by: sort, direction: 'desc' },
        query
    });
    if (filter === 'created') {
        return getCurrentMemberNotes;
    }
    else if (filter === 'all') {
        return getAllNotes;
    }
    else {
        return getForMeNotes;
    }
}
