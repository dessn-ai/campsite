import React from 'react';
import { CallsIndexEmptyState } from '../apps/web/components/Calls/index.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    project: {
      type: 'object',
      value: {
        id: 'project-123',
        name: 'Sample Project',
        description: 'A sample project description',
        created_at: '2024-01-20T12:00:00Z',
        archived_at: null,
        archived: false,
        last_activity_at: '2024-01-20T12:00:00Z',
        slack_channel_id: null,
        posts_count: 5,
        cover_photo_url: null,
        url: '/projects/123',
        accessory: null,
        private: false,
        personal: false,
        is_general: false,
        is_default: false,
        contributors_count: 3,
        members_and_guests_count: 10,
        members_count: 8,
        guests_count: 2,
        call_room_url: null,
        message_thread_id: 'thread-123',
        organization_id: 'org-123',
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
        viewer_display_preferences: {
          display_reactions: true,
          display_attachments: true,
          display_comments: true,
          display_resolved: true
        },
        display_preferences: {
          display_reactions: true,
          display_attachments: true,
          display_comments: true,
          display_resolved: true
        }
      },
      label: 'Project'
    }
  });

  return <CallsIndexEmptyState project={state.project.value} />;
}