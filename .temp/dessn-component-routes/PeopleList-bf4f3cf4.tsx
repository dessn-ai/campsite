import React from 'react';
import { PeopleList } from '../apps/web/components/People/PeopleList.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  // Since PeopleList doesn't accept any props, we don't need to set up any state
  // But we'll keep the useParentState structure in case props are added in the future
  const [state] = useParentState({});

  return <PeopleList />;
}