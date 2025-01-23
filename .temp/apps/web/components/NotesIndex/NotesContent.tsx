import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Note, NotePage } from "../../../../packages/types/generated.ts";
import { Command, useCommand } from "../../../../packages/ui/src/Command/index.ts";
import { ConditionalWrap } from "../../../../packages/ui/src/utils/index.ts";
import { EmptySearchResults } from "../Feed/EmptySearchResults.tsx";
import { IndexPageLoading } from "../IndexPages/components.tsx";
import { InfiniteLoader } from "../InfiniteLoader.tsx";
import { NotesIndexEmptyState } from "./index.tsx";
import { NoteRow } from "./NoteRow.tsx";
import { NotesGrid } from "./NotesGrid.tsx";
import { NotesList } from "./NotesList.tsx";
import { SubjectCommand } from "../Subject/SubjectCommand.tsx";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser.ts";
import { flattenInfiniteData } from "../../utils/flattenInfiniteData.ts";
interface Props {
    getNotes: ReturnType<typeof useInfiniteQuery<NotePage>>;
    searching?: boolean;
    hideProject?: boolean;
}
export function NotesContent({ getNotes, searching, hideProject }: Props) {
    const { data: currentUser } = useGetCurrentUser();
    const notes = useMemo(() => flattenInfiniteData(getNotes.data) ?? [], [getNotes.data]);
    if (getNotes.isLoading) {
        return <IndexPageLoading />;
    }
    if (!notes.length) {
        return searching ? <EmptySearchResults /> : <NotesIndexEmptyState />;
    }
    const layout = currentUser?.preferences?.notes_layout;
    return (<>
      {searching ? (<NotesSearchList notes={notes} hideProject={hideProject}/>) : layout === 'list' ? (<NotesList notes={notes} hideProject={hideProject}/>) : (<NotesGrid notes={notes} hideProject={hideProject}/>)}

      <InfiniteLoader hasNextPage={!!getNotes.hasNextPage} isError={!!getNotes.isError} isFetching={!!getNotes.isFetching} isFetchingNextPage={!!getNotes.isFetchingNextPage} fetchNextPage={getNotes.fetchNextPage}/>
    </>);
}
function NotesSearchList({ notes, hideProject }: {
    notes: Note[];
    hideProject?: boolean;
}) {
    const needsCommandWrap = !useCommand();
    return (<ConditionalWrap condition={needsCommandWrap} wrap={(children) => (<SubjectCommand>
          <Command.List className='-mx-2 flex flex-1 flex-col gap-px'>{children}</Command.List>
        </SubjectCommand>)}>
      {notes.map((note) => (<NoteRow note={note} key={note.id} display='search' hideProject={hideProject}/>))}
    </ConditionalWrap>);
}
