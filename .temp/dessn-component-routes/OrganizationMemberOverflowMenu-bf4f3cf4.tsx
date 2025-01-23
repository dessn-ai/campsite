import React from 'react';

// Mock OrganizationMemberOverflowMenu component
const OrganizationMemberOverflowMenu = ({ member }) => (
  <div>
    <h3>Organization Member Overflow Menu</h3>
    <p>Member ID: {member.id}</p>
    <p>Role: {member.role}</p>
    <p>User: {member.user.display_name}</p>
  </div>
);

// Mock useParentState hook
const useParentState = (initialState) => {
  const [state] = React.useState(initialState);
  return [state];
};

export default function Preview() {
  const [state] = useParentState({
    member: {
      type: 'object',
      value: {
        id: 'member-123',
        role: 'admin',
        deactivated: false,
        last_seen_at: '2024-01-20T12:00:00Z',
        user: {
          id: 'user-123',
          avatar_urls: {
            xs: 'https://placekitten.com/24/24',
            sm: 'https://placekitten.com/32/32',
            base: 'https://placekitten.com/48/48',
            lg: 'https://placekitten.com/64/64',
            xl: 'https://placekitten.com/96/96',
            xxl: 'https://placekitten.com/128/128'
          },
          display_name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          integration: false,
          notifications_paused: false
        }
      },
      label: 'Member'
    }
  });

  return <OrganizationMemberOverflowMenu member={state.member.value} />;
}