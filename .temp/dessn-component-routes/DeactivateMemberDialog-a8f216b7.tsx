import React from 'react';
import { DeactivateMemberDialog } from '../apps/web/components/People/DeactivateMemberDialog.tsx';

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
      value: 'admin',
      options: ['admin', 'member', 'viewer', 'guest'],
      label: 'Member Role'
    },
    memberDeactivated: {
      type: 'boolean',
      value: false,
      label: 'Member Deactivated'
    },
    displayName: {
      type: 'string',
      value: 'John Doe',
      label: 'Display Name'
    },
    username: {
      type: 'string',
      value: 'johndoe',
      label: 'Username'
    },
    email: {
      type: 'string',
      value: 'john@example.com',
      label: 'Email'
    }
  });

  const mockMember = {
    id: '123',
    role: state.memberRole.value,
    deactivated: state.memberDeactivated.value,
    last_seen_at: '2024-01-01T00:00:00Z',
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
      display_name: state.displayName.value,
      username: state.username.value,
      email: state.email.value,
      integration: false,
      notifications_paused: false
    }
  };

  return (
    <DeactivateMemberDialog
      member={mockMember}
      open={state.open.value}
      onOpenChange={(open) => setState('open', open)}
    />
  );
}