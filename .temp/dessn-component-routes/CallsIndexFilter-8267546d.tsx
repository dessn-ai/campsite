import React from 'react';
import { CallsIndexFilter } from '../apps/web/components/Calls/CallsIndexFilter.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    fullWidth: {
      type: 'boolean',
      value: false,
      label: 'Full Width'
    }
  });

  return (
    <CallsIndexFilter
      fullWidth={state.fullWidth.value}
    />
  );
}