import React from 'react';
import { NewCallDropdownMenu } from '../apps/web/components/Calls/NewCallDropdownMenu.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    side: {
      type: 'dropdown',
      value: 'bottom',
      options: ['top', 'bottom', 'left', 'right'],
      label: 'Side'
    },
    align: {
      type: 'dropdown',
      value: 'start',
      options: ['start', 'center', 'end'],
      label: 'Align'
    },
    disabled: {
      type: 'boolean',
      value: false,
      label: 'Disabled'
    },
    trigger: {
      type: 'dropdown',
      value: 'click',
      options: ['click', 'hover'],
      label: 'Trigger'
    }
  });

  return (
    <NewCallDropdownMenu
      side={state.side.value}
      align={state.align.value}
      disabled={state.disabled.value}
      trigger={state.trigger.value}
    />
  );
}