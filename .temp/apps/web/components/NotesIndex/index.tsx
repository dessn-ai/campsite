import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useDebounce } from 'use-debounce';
import { Note } from "../../../../packages/types/index.ts";
import { Avatar, Button, LayeredHotkeys, Link, NoteIcon, PrivateNoteIcon, Tooltip, UIText } from "../../../../packages/ui/src/index.tsx";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
import { FloatingNewDocButton } from "../FloatingButtons/NewDoc.tsx";
import { IndexPageContainer, IndexPageContent, IndexPageEmptyState, IndexSearchInput } from "../IndexPages/components.tsx";
import { MemberHovercard } from "../InlinePost/MemberHovercard.tsx";
import { RefetchingPageIndicator } from "../NavigationBar/RefetchingPageIndicator.tsx";
import { refetchingNotesAtom } from "../NavigationBar/useNavigationTabAction.ts";
import { NewNoteButton } from "./NewNoteButton.tsx";
import { NotesContent } from "./NotesContent.tsx";
import { filterAtom, NotesIndexDisplayDropdown } from "./NotesIndexDisplayDropdown.tsx";
import { useGetNotesIndex } from "./useGetNotesIndex.ts";
import { SplitViewContainer, SplitViewDetail } from "../SplitView/index.tsx";
import { NoteBreadcrumbIcon } from "../Titlebar/BreadcrumbPageIcons.tsx";
import { BreadcrumbLabel, BreadcrumbTitlebar, BreadcrumbTitlebarContainer } from "../Titlebar/BreadcrumbTitlebar.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser.ts";
export function NotesIndex() {
    const { scope } = useScope();
    const isRefetching = useAtomValue(refetchingNotesAtom);
    const [query, setQuery] = useState('');
    const [queryDebounced] = useDebounce(query, 150);
    const getNotes = useGetNotesIndex({ query: queryDebounced });
    const isSearching = query.length > 0;
    const isSearchLoading = queryDebounced.length > 0 && getNotes.isFetching;
    const { data: currentUser } = useGetCurrentUser();
    const layout = currentUser?.preferences?.notes_layout;
    const maxW = layout === 'list' ? 'max-w-4xl' : 'max-w-7xl 3xl:max-w-7xl';
    return (<>
      <FloatingNewDocButton />

      <SplitViewContainer>
        <IndexPageContainer>
          <BreadcrumbTitlebar className='justify-between'>
            <Link draggable={false} href={`/${scope}/notes`} className='flex items-center gap-3'>
              <NoteBreadcrumbIcon />
              <BreadcrumbLabel>Docs</BreadcrumbLabel>
            </Link>

            <div className='ml-2 flex flex-1 items-center gap-0.5'>
              <NotesIndexTabFilter />
            </div>

            <NewNoteButton />
          </BreadcrumbTitlebar>

          <MobileTitlebar />

          <BreadcrumbTitlebarContainer className='h-10'>
            <IndexSearchInput query={query} setQuery={setQuery} isSearchLoading={isSearchLoading}/>
            <NotesIndexDisplayDropdown />
          </BreadcrumbTitlebarContainer>

          <RefetchingPageIndicator isRefetching={isRefetching}/>

          <IndexPageContent id='/[org]/notes' className={cn('@container', maxW)}>
            <NotesContent getNotes={getNotes} searching={isSearching}/>
          </IndexPageContent>
        </IndexPageContainer>

        <SplitViewDetail />
      </SplitViewContainer>
    </>);
}
export function NotesIndexEmptyState() {
    return (<IndexPageEmptyState>
      <NoteIcon size={32}/>
      <div className='flex flex-col gap-1'>
        <UIText size='text-base' weight='font-semibold'>
          Create a doc
        </UIText>
        <UIText size='text-base' tertiary>
          Docs are a collaborative writing surface for you and your team.
        </UIText>
      </div>
      <NewNoteButton />
    </IndexPageEmptyState>);
}
export function NotePrivacyIndicator({ note, className }: {
    note: Note;
    className?: string;
}) {
    const isPublicProject = note.project_permission !== 'none' && !note.project?.private;
    const isSharedWithOthers = note.permitted_users.length > 0;
    const isPrivate = !isPublicProject && !isSharedWithOthers && note.viewer_is_author;
    const isPrivateProject = note.project_permission !== 'none' && note.project?.private;
    const tooltipLabel = (() => {
        if (isPrivate)
            return 'Private';
        if (isPrivateProject)
            return 'Shared in private channel';
        if (isPublicProject)
            return `Shared in ${note.project?.name || 'channel'}`;
        if (isSharedWithOthers)
            return 'Shared with others';
        return '';
    })();
    const icon = (() => {
        if (isPublicProject)
            return <NoteIcon size={24}/>;
        if (isPrivate || isPrivateProject)
            return <PrivateNoteIcon size={24}/>;
        if (isSharedWithOthers)
            return <PrivateNoteIcon size={24}/>;
        return null;
    })();
    return (<Tooltip label={tooltipLabel}>
      <span className={cn('z-[2]', className)}>{icon}</span>
    </Tooltip>);
}
export function NoteOwnerAvatar({ note, className, size = 'sm' }: {
    note: Note;
    className?: string;
    size?: 'sm' | 'xs';
}) {
    const { scope } = useScope();
    return (<span className={className}>
      <MemberHovercard side='top' align='center' username={note.member.user.username}>
        <Avatar deactivated={note.member.deactivated} href={`/${scope}/people/${note.member.user.username}`} size={size} urls={note.member.user.avatar_urls} name={note.member.user.display_name}/>
      </MemberHovercard>
    </span>);
}
function NotesIndexTabFilter({ fullWidth = false }: {
    fullWidth?: boolean;
}) {
    const { scope } = useScope();
    const [filter, setFilter] = useAtom(filterAtom(scope));
    return (<>
      <LayeredHotkeys keys='1' callback={() => setFilter('for-me')}/>
      <LayeredHotkeys keys='2' callback={() => setFilter('created')}/>
      <LayeredHotkeys keys='3' callback={() => setFilter('all')}/>

      <Button size='sm' fullWidth={fullWidth} onClick={() => setFilter('for-me')} variant={filter === 'for-me' ? 'flat' : 'plain'} tooltip='Docs you are participating in and in channels you joined' tooltipShortcut='1'>
        For me
      </Button>
      <Button size='sm' fullWidth={fullWidth} onClick={() => setFilter('created')} variant={filter === 'created' ? 'flat' : 'plain'} tooltip='Created' tooltipShortcut='2'>
        Created
      </Button>
      <Button size='sm' fullWidth={fullWidth} onClick={() => setFilter('all')} variant={filter === 'all' ? 'flat' : 'plain'} tooltip='All' tooltipShortcut='3'>
        All
      </Button>
    </>);
}
export const NotesTrailingAccessory = () => <NotesIndexDisplayDropdown iconOnly/>;
function MobileTitlebar() {
    return (<BreadcrumbTitlebar className='flex h-auto py-1.5 lg:hidden'>
      <div className='flex flex-1 items-center gap-1'>
        <NotesIndexTabFilter fullWidth/>
      </div>
    </BreadcrumbTitlebar>);
}
