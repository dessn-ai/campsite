import React from 'react';
import { PeopleIndexEmptyState } from '../apps/web/components/People/PeopleIndexEmptyState.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    description: {
      type: 'string',
      value: 'Custom description for the empty state',
      label: 'Description'
    }
  });

  return (
    <PeopleIndexEmptyState 
      description={state.description.value}
    />
  );
}