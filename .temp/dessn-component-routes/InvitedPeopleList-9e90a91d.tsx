import React from 'react';
import { InvitedPeopleList } from '../apps/web/components/People/InvitedPeopleList.tsx';

import { useParentState } from '../useIframeState.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function Preview() {
  const [state] = useParentState({
    mockData: {
      type: 'boolean',
      value: true,
      label: 'Show Mock Data'
    }
  });

  // Mock the hooks that the component uses
  const mockInvitations = [
    {
      id: '1',
      email: 'john.doe@example.com',
      role: 'Admin',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      role: 'Member',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      email: 'bob.wilson@example.com',
      role: 'Viewer',
      createdAt: new Date().toISOString()
    }
  ];

  // Mock the query client responses
  queryClient.setQueryData(['organizationInvitations'], {
    pages: [mockInvitations],
    pageParams: [0]
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <InvitedPeopleList />
      </div>
    </QueryClientProvider>
  );
}