import React from 'react';
import { PeopleTitlebar } from '../apps/web/components/People/PeopleTitlebar.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state] = useParentState({
    scope: {
      type: 'string',
      value: 'organization',
      label: 'Scope'
    }
  });

  // Mock the necessary context providers and atoms
  const ScopeProvider = ({ children }: { children: React.ReactNode }) => {
    return React.cloneElement(children as React.ReactElement, {
      scope: {
        scope: state.scope.value
      }
    });
  };

  return (
    <ScopeProvider>
      <PeopleTitlebar />
    </ScopeProvider>
  );
}