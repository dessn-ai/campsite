import React from 'react';
import { CompactCallRow } from '../apps/web/components/Calls/index.tsx';
import { useParentState } from '../useIframeState.ts';

// Mock QueryNormalizerProvider
const QueryNormalizerProvider = ({ children }) => {
  const mockNormalizer = {
    normalize: (query) => query,
    denormalize: (query) => query,
  };
  return React.createElement(React.Fragment, null, children);
};

export default function Preview() {
  const [state, setState] = useParentState({
    call: {
      type: 'object',
      value: {
        id: '123',
        title: 'Weekly Team Sync',
        summary_html: '<p>Discussed project updates and next steps</p>',
        is_edited: false,
        created_at: '2024-01-20T10:00:00Z',
        started_at: '2024-01-20T10:00:00Z',
        stopped_at: '2024-01-20T11:00:00Z',
        duration: '1h',
        recordings_duration: '58m',
        active: false,
        project_permission: 'edit',
        channel_name: 'team-sync',
        peers: [],
        project: {
          id: 'proj123',
          name: 'Project Alpha',
          accessory: null,
          private: false,
          archived: false,
          message_thread_id: null
        },
        follow_ups: [],
        type_name: 'call',
        viewer_can_edit: true,
        viewer_can_destroy_all_recordings: true,
        viewer_has_favorited: false,
        processing_generated_title: false,
        processing_generated_summary: false,
        project_pin_id: null,
        url: '/calls/123'
      },
      label: 'Call Data'
    },
    display: {
      type: 'dropdown',
      value: 'default',
      options: ['default', 'search', 'pinned'],
      label: 'Display Mode'
    },
    hideProject: {
      type: 'boolean',
      value: false,
      label: 'Hide Project'
    }
  });

  return (
    <QueryNormalizerProvider>
      <CompactCallRow
        call={state.call.value}
        display={state.display.value}
        hideProject={state.hideProject.value}
      />
    </QueryNormalizerProvider>
  );
}