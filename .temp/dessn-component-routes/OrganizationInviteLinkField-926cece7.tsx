import React from 'react';
import { OrganizationInviteLinkField } from '../apps/web/components/People/OrganizationInviteLinkField.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    onboarding: {
      type: 'boolean',
      value: false,
      label: 'Onboarding Mode'
    }
  });

  return (
    <OrganizationInviteLinkField
      onboarding={state.onboarding.value}
    />
  );
}