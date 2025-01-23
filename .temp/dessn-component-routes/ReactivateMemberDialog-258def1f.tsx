import React from 'react';
import { ReactivateMemberDialog } from '../apps/web/components/People/ReactivateMemberDialog.tsx';
import { ScopeProvider } from '../apps/web/contexts/scope.tsx';
import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    open: {
      type: 'boolean',
      value: true,
      label: 'Dialog Open'
    },
    memberRole: {
      type: 'dropdown',
      value: 'member',
      options: ['admin', 'member', 'viewer', 'guest'],
      label: 'Member Role'
    },
    memberDeactivated: {
      type: 'boolean',
      value: true,
      label: 'Member Deactivated'
    },
    lastSeenAt: {
      type: 'string',
      value: '2024-01-20T10:30:00Z',
      label: 'Last Seen At'
    }
  });

  const member = {
    id: '123456',
    role: state.memberRole.value,
    deactivated: state.memberDeactivated.value,
    last_seen_at: state.lastSeenAt.value,
    user: {
      id: 'user123',
      avatar_urls: {
        xs: 'https://placekitten.com/24/24',
        sm: 'https://placekitten.com/32/32',
        base: 'https://placekitten.com/48/48',
        lg: 'https://placekitten.com/64/64',
        xl: 'https://placekitten.com/128/128',
        xxl: 'https://placekitten.com/256/256'
      },
      display_name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      integration: false,
      notifications_paused: false
    }
  };

  // Mock scope value
  const mockScope = {
    organization: { id: 'org123', name: 'Mock Organization' },
    project: { id: 'proj456', name: 'Mock Project' },
    // Add any other necessary scope properties
  };

  return (
    <ScopeProvider value={mockScope}>
      <ReactivateMemberDialog
        member={member}
        open={state.open.value}
        onOpenChange={(open) => setState('open', open)}
      />
    </ScopeProvider>
  );
}