import React from 'react';
import { CallsContent } from '../apps/web/components/Calls/index.tsx';
import { useParentState } from '../useIframeState.ts';

// Mock QueryNormalizer context
const QueryNormalizerContext = React.createContext({
  normalize: (query) => query,
  denormalize: (query) => query,
});

// Mock Command context to prevent null access
const CommandContext = React.createContext({
  filter: () => true,
  value: '',
  // Add other necessary properties
});

export default function Preview() {
  const [state, setState] = useParentState({
    isSearching: {
      type: 'boolean',
      value: false,
      label: 'Is Searching'
    },
    project: {
      type: 'dropdown',
      value: 'with-project',
      options: ['with-project', 'without-project'],
      label: 'Project State'
    }
  });

  const mockProject = state.project.value === 'with-project' ? {
    id: 'project-1',
    name: 'Sample Project',
    description: 'A sample project description',
    created_at: '2024-01-01T00:00:00Z',
    archived_at: null,
    archived: false,
    last_activity_at: '2024-01-01T00:00:00Z',
    slack_channel_id: null,
    posts_count: 10,
    cover_photo_url: null,
    url: '/sample-project',
    accessory: null,
    private: false,
    personal: false,
    is_general: false,
    is_default: false,
    contributors_count: 5,
    members_and_guests_count: 10,
    members_count: 8,
    guests_count: 2,
    call_room_url: null,
    message_thread_id: null,
    organization_id: 'org-1',
    viewer_has_favorited: false,
    viewer_can_archive: true,
    viewer_can_destroy: true,
    viewer_can_unarchive: true,
    viewer_can_update: true,
    viewer_has_subscribed: true,
    viewer_subscription: 'posts_and_comments',
    viewer_is_member: true,
    unread_for_viewer: false,
    slack_channel: null,
    type_name: 'Project',
    viewer_display_preferences: null,
    display_preferences: {
      display_reactions: true,
      display_attachments: true,
      display_comments: true,
      display_resolved: true
    }
  } : undefined;

  const mockGetCalls = {
    data: { pages: [] },
    hasNextPage: false,
    isFetching: false,
    isLoading: false,
    isFetchingNextPage: false,
    isError: false,
    fetchNextPage: () => Promise.resolve()
  };

  return (
    <QueryNormalizerContext.Provider value={{ normalize: (query) => query, denormalize: (query) => query }}>
      <CommandContext.Provider value={{ filter: () => true, value: '' }}>
        <CallsContent
          getCalls={mockGetCalls}
          isSearching={state.isSearching.value}
          project={mockProject}
        />
      </CommandContext.Provider>
    </QueryNormalizerContext.Provider>
  );
}