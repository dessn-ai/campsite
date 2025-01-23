import React from 'react';
import { InboundRequests } from '../apps/web/components/People/InboundRequests.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state] = useParentState({
    requests: {
      type: 'string',
      value: JSON.stringify([
        {
          id: '1',
          user: {
            display_name: 'John Doe',
            email: 'john@example.com',
            avatar_urls: ['https://i.pravatar.cc/150?img=1']
          }
        },
        {
          id: '2',
          user: {
            display_name: 'Jane Smith',
            email: 'jane@example.com',
            avatar_urls: ['https://i.pravatar.cc/150?img=2']
          }
        }
      ]),
      label: 'Requests'
    }
  });

  return (
    <InboundRequests />
  );
}