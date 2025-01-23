import React from 'react';
import { MobileCallsTitlebar } from '../apps/web/components/Calls/MobileCallsTitlebar.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state] = useParentState({});

  return <MobileCallsTitlebar />;
}