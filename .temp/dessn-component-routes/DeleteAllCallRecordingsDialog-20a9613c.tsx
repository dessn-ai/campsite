import React from 'react';
import { DeleteAllCallRecordingsDialog } from '../apps/web/components/Calls/DeleteAllCallRecordingsDialog.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    open: {
      type: 'boolean',
      value: true,
      label: 'Dialog Open'
    },
    call: {
      type: 'object',
      value: {
        id: '123',
        title: 'Sample Call',
        summary_html: '<p>This is a sample call summary</p>',
        is_edited: false,
        created_at: '2024-01-01T12:00:00Z',
        started_at: '2024-01-01T12:00:00Z',
        stopped_at: '2024-01-01T13:00:00Z',
        duration: '1h',
        recordings_duration: '55m',
        active: false,
        project_permission: 'edit',
        channel_name: 'general',
        peers: [],
        project: {
          id: 'proj123',
          name: 'Sample Project',
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
        url: 'https://example.com/call/123'
      },
      label: 'Call Data'
    }
  });

  return (
    <DeleteAllCallRecordingsDialog
      call={state.call.value}
      open={state.open.value}
      onOpenChange={(open) => setState('open', open)}
      onDelete={() => console.log('Delete clicked')}
    />
  );
}