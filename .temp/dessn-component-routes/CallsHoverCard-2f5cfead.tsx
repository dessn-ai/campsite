import React from 'react';
import { CallsHoverCard } from '../apps/web/components/Calls/CallsHoverCard.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    side: {
      type: 'dropdown',
      value: 'right',
      options: ['left', 'right', 'top', 'bottom'],
      label: 'Side'
    },
    align: {
      type: 'dropdown',
      value: 'start',
      options: ['start', 'end', 'center'],
      label: 'Align'
    },
    sideOffset: {
      type: 'number',
      value: 0,
      label: 'Side Offset'
    },
    alignOffset: {
      type: 'number',
      value: 0,
      label: 'Align Offset'
    },
    disabled: {
      type: 'boolean',
      value: false,
      label: 'Disabled'
    }
  });

  return (
    <CallsHoverCard
      side={state.side.value}
      align={state.align.value}
      sideOffset={state.sideOffset.value}
      alignOffset={state.alignOffset.value}
      disabled={state.disabled.value}
    >
      <button>Hover over me</button>
    </CallsHoverCard>
  );
}