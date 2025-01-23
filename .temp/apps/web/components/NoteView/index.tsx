import { createContext, useContext, useEffect, useRef } from 'react';
import Router from 'next/router';
import { Note } from "../../../../packages/types/index.ts";
import { ArrowUpRightIcon, Button, ChatBubbleIcon, ChevronDownIcon, GlobeIcon, Link, LockIcon, NoteIcon, PaperAirplaneIcon, PrivateNoteIcon, UIText } from "../../../../packages/ui/src/index.tsx";
import { CopyCurrentUrl } from "../CopyCurrentUrl.tsx";
import { EmptyState } from "../EmptyState/index.tsx";
import { FullPageLoading } from "../FullPageLoading.tsx";
import { InboxSplitViewTitleBar } from "../InboxItems/InboxSplitView.tsx";
import { InboxTriageActions } from "../InboxItems/InboxTriageActions.tsx";
import { NoteFavoriteButton } from "../NotesIndex/NoteFavoriteButton.tsx";
import { SplitViewBreadcrumbs } from "../SplitView/index.tsx";
import { useIsSplitViewAvailable } from "../SplitView/hooks/index.ts";
import { SubjectEspcapeLayeredHotkeys } from "../Subject/index.ts";
import { ProjectAccessoryBreadcrumbIcon } from "../Titlebar/BreadcrumbPageIcons.tsx";
import { BreadcrumbLabel } from "../Titlebar/BreadcrumbTitlebar.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { useCreateNoteView } from "../../hooks/useCreateNoteView.ts";
import { useGetNote } from "../../hooks/useGetNote.tsx";
import { useGetNoteComments } from "../../hooks/useGetNoteComments.tsx";
import { useGetNoteTimelineEvents } from "../../hooks/useGetNoteTimelineEvents.ts";
import { useLiveNoteUpdates } from "../../hooks/useLiveNoteUpdates.ts";
import { NoteCommentsPopover } from "../NoteComments/NoteCommentsPopover.tsx";
import { NoteEditor } from "../NoteEditor/index.tsx";
import { NoteOverflowMenu } from "../NoteOverflowMenu/index.tsx";
import { NoteSharePopover } from "../NoteSharePopover/index.tsx";
import { ScrollableContainer } from "../ScrollableContainer.tsx";
import { useTrackRecentlyViewedItem } from "../Sidebar/RecentlyViewed/utils.ts";
import { NoteViewersPopover } from "./NoteViewersPopover.tsx";
const NoteViewContext = createContext<string | null>(null);
export const useNoteView = () => useContext(NoteViewContext);
export function NoteView({ noteId }: {
    noteId: string;
}) {
    const { scope } = useScope();
    const { data: note, isLoading } = useGetNote({ id: noteId, enabled: !!noteId });
    if (isLoading) {
        return <FullPageLoading />;
    }
    if (!note) {
        return (<EmptyState title='Note not found' message='It may have been deleted or had its permissions changed.' icon={<NoteIcon size={40}/>}>
        <div className='mt-4'>
          <Button onClick={() => Router.push(`/${scope}`)} variant='primary'>
            Go home
          </Button>
        </div>
      </EmptyState>);
    }
    return (<NoteViewContext.Provider value={note.id}>
      <InnerNoteView note={note}/>
    </NoteViewContext.Provider>);
}
function InnerNoteView({ note }: {
    note: Note;
}) {
    const { isSplitViewAvailable } = useIsSplitViewAvailable();
    const trackRef = useTrackRecentlyViewedItem({ id: note.id, note });
    useCreateLingerNoteView(note.id, !!note);
    useLiveNoteUpdates(note);
    // prefetch comments
    useGetNoteComments({ noteId: note.id });
    useGetNoteTimelineEvents({ noteId: note.id, enabled: true });
    return (<div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
      <SubjectEspcapeLayeredHotkeys />
      <CopyCurrentUrl override={note.url}/>

      <InboxSplitViewTitleBar hideSidebarToggle={isSplitViewAvailable}>
        {isSplitViewAvailable ? (<SplitViewBreadcrumbs />) : (<>
            <InboxTriageActions />
            <NoteBreadcrumbs note={note}/>
          </>)}

        <NoteTrailingAccessory noteId={note.id}/>
      </InboxSplitViewTitleBar>

      <PublicVisibilityBanner note={note}/>

      <ScrollableContainer id='note-scroll-container'>
        <div ref={trackRef} className='relative flex w-full flex-1 scroll-mt-4 px-4 pt-5 md:pt-10 lg:pt-12 xl:pt-16 2xl:pt-20'>
          {note && (<NoteEditor 
        // key by note.id in order to reset tiptap editor state
        key={note.id} note={note}/>)}
        </div>
      </ScrollableContainer>
    </div>);
}
function PublicVisibilityBanner({ note }: {
    note: Note;
}) {
    if (!note.public_visibility)
        return null;
    return (<Link target='_blank' href={note.public_share_url} className='flex w-full items-center justify-center gap-4 border-b border-blue-100/60 bg-blue-50 px-4 py-2 text-sm text-blue-500 hover:bg-blue-100/70 dark:border-blue-900/35 dark:bg-blue-900/20 dark:text-blue-200 dark:hover:bg-blue-900/40'>
      <div className='flex items-center gap-2'>
        <GlobeIcon className='hidden flex-none sm:flex'/>
        <UIText weight='font-medium' inherit>
          Published to the web
        </UIText>
        <ArrowUpRightIcon size={16} strokeWidth='2'/>
      </div>
    </Link>);
}
function useCreateLingerNoteView(noteId: string, isLoaded: boolean) {
    const { mutate: create } = useCreateNoteView();
    const hasMarkedSeen = useRef(false);
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isLoaded) {
            timer = setTimeout(() => {
                if (hasMarkedSeen.current)
                    return;
                hasMarkedSeen.current = true;
                create({ noteId });
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [create, isLoaded, noteId]);
}
function NoteBreadcrumbs({ note }: {
    note: Note;
}) {
    const { scope } = useScope();
    return (<div className='flex min-w-0 flex-1 items-center gap-1.5'>
      {note.project && note.project_permission !== 'none' ? (<>
          <Link className='break-anywhere flex min-w-0 items-center gap-1 truncate' href={`/${scope}/projects/${note.project.id}`}>
            <ProjectAccessoryBreadcrumbIcon project={note.project}/>
            <BreadcrumbLabel>{note.project.name}</BreadcrumbLabel>
            {note.project.private && <LockIcon size={16} className='text-tertiary'/>}
          </Link>

          <span className='-ml-1 -mr-0.5 inline-flex min-w-1 items-center'>
            {note.viewer_can_edit && (<NoteSharePopover note={note} align='start'>
                <Button size='sm' variant='plain' iconOnly accessibilityLabel='Move to channel' className='w-5'>
                  <ChevronDownIcon strokeWidth='2' size={16}/>
                </Button>
              </NoteSharePopover>)}
          </span>
        </>) : (<NoteSharePopover note={note} align='start'>
          <Button size='sm' variant='plain' leftSlot={<PrivateNoteIcon />} className='-mr-1'>
            <BreadcrumbLabel>Private</BreadcrumbLabel>
          </Button>
        </NoteSharePopover>)}

      <UIText quaternary>/</UIText>
      <Link href={`/${scope}/notes/${note.id}`} title={note.title} className='break-anywhere min-w-0 truncate'>
        <BreadcrumbLabel className='ml-1'>{note.title || 'Untitled'}</BreadcrumbLabel>
      </Link>
      <NoteFavoriteButton note={note} shortcutEnabled/>
    </div>);
}
export function NoteTrailingAccessory({ noteId }: {
    noteId: string;
}) {
    const { data: note } = useGetNote({ id: noteId });
    const activeCommentsCount = note?.comments_count ?? 0;
    return (<div className='flex items-center justify-end gap-0.5'>
      {note && <NoteViewersPopover note={note}/>}

      {note && (<>
          <NoteSharePopover note={note}>
            <Button leftSlot={<PaperAirplaneIcon />} variant='plain' tooltip='Share note'>
              Share
            </Button>
          </NoteSharePopover>

          <NoteCommentsPopover note={note}>
            {activeCommentsCount > 0 ? (<Button leftSlot={<ChatBubbleIcon />} variant='plain'>
                {activeCommentsCount}
              </Button>) : (<Button iconOnly={<ChatBubbleIcon />} accessibilityLabel='Comments' variant='plain'/>)}
          </NoteCommentsPopover>

          <NoteOverflowMenu type='dropdown' note={note} enabledShortcuts={['delete']}/>
        </>)}
    </div>);
}
