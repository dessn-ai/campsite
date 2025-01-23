import React from 'react';
import { PeopleIndexMemberRow } from '../apps/web/components/People/PeopleIndexMemberRow.tsx';
import { ScopeProvider } from '../apps/web/contexts/scope.tsx';
import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    id: {
      type: 'string',
      value: 'member-row-1',
      label: 'ID'
    },
    role: {
      type: 'dropdown',
      value: 'member',
      options: ['admin', 'member', 'viewer', 'guest'],
      label: 'Member Role'
    },
    deactivated: {
      type: 'boolean',
      value: false,
      label: 'Deactivated'
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
      value: 'john.doe@example.com',
      label: 'Email'
    }
  });

  const member = {
    id: '123',
    role: state.role.value,
    deactivated: state.deactivated.value,
    last_seen_at: '2023-01-01T00:00:00Z',
    user: {
      id: '456',
      avatar_urls: {
        xs: 'https://via.placeholder.com/24',
        sm: 'https://via.placeholder.com/32',
        base: 'https://via.placeholder.com/48',
        lg: 'https://via.placeholder.com/64',
        xl: 'https://via.placeholder.com/128',
        xxl: 'https://via.placeholder.com/256'
      },
      display_name: state.displayName.value,
      username: state.username.value,
      email: state.email.value,
      integration: false,
      notifications_paused: false
    }
  };

  return (
    <ScopeProvider value={{ scope: 'preview' }}>
      <ul className="max-w-2xl">
        <PeopleIndexMemberRow
          id={state.id.value}
          member={member}
        />
      </ul>
    </ScopeProvider>
  );
}