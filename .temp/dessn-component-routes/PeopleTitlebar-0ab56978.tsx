import React from 'react';
import { useParentState } from '../useIframeState';

// Simplified PeopleTitlebar component
const PeopleTitlebar = ({ scope }: { scope: { scope: string } }) => {
  return (
    <div>
      <h1>People Titlebar</h1>
      <p>Current scope: {scope.scope}</p>
    </div>
  );
};

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
      <PeopleTitlebar scope={{ scope: state.scope.value }} />
    </ScopeProvider>
  );
}