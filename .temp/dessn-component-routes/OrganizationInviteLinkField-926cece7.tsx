import React from 'react';
import { OrganizationInviteLinkField } from '../apps/web/components/People/OrganizationInviteLinkField.tsx';
import { ScopeProvider } from '../apps/web/contexts/scope';
import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    onboarding: {
      type: 'boolean',
      value: false,
      label: 'Onboarding Mode'
    }
  });

  // Mock scope data
  const mockScope = {
    organization: {
      id: 'mock-org-id',
      name: 'Mock Organization',
    },
    // Add other necessary scope data here
  };

  return (
    <ScopeProvider value={mockScope}>
      <OrganizationInviteLinkField
        onboarding={state.onboarding.value}
      />
    </ScopeProvider>
  );
}