import React from 'react';
import { RemoveInvitationDialog } from '../apps/web/components/People/RemoveInvitationDialog.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    open: {
      type: 'boolean',
      value: true,
      label: 'Dialog Open'
    },
    invitation: {
      type: 'object',
      value: {
        id: 'inv_123456789',
        email: 'user@example.com',
        role: 'member',
        expired: false,
        organization: {
          avatar_url: 'https://placekitten.com/200/200',
          avatar_urls: {
            xs: 'https://placekitten.com/50/50',
            sm: 'https://placekitten.com/100/100',
            base: 'https://placekitten.com/200/200',
            lg: 'https://placekitten.com/300/300',
            xl: 'https://placekitten.com/400/400',
            xxl: 'https://placekitten.com/500/500'
          },
          name: 'Example Organization',
          slug: 'example-org'
        },
        projects: [],
        token: 'token_123456789'
      },
      label: 'Invitation Data'
    }
  });

  return (
    <RemoveInvitationDialog
      invitation={state.invitation.value}
      open={state.open.value}
      onOpenChange={(open) => setState('open', open)}
    />
  );
}