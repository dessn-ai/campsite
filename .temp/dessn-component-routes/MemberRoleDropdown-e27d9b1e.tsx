import React from 'react';
import { MemberRoleDropdown } from '../apps/web/components/People/MemberRoleDropdown.tsx';
import { useParentState } from '../useIframeState.ts';
import { ScopeProvider } from '../apps/web/contexts/scope.tsx';

export default function Preview() {
  const [state, setState] = useParentState({
    role: {
      type: 'dropdown',
      value: 'member',
      options: ['admin', 'member', 'viewer', 'guest'],
      label: 'Member Role'
    }
  });

  const mockMember = {
    id: '123456',
    role: state.role.value,
    deactivated: false,
    last_seen_at: '2023-12-25T12:00:00Z',
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

  const mockScope = {
    organizationId: 'mock-org-id',
    // Add other required properties here
  };

  return (
    <ScopeProvider value={mockScope}>
      <MemberRoleDropdown
        member={mockMember}
        value={state.role.value}
      />
    </ScopeProvider>
  );
}