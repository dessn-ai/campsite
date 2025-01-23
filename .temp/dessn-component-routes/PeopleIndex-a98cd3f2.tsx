import React from 'react';
import { PeopleIndex } from '../apps/web/components/People/PeopleIndex.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state] = useParentState({
    // Since PeopleIndex doesn't accept any props, we don't need to define any state
  });

  return <PeopleIndex />;
}