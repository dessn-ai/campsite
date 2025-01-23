import React from 'react';
import { NewCallButton } from '../apps/web/components/Calls/NewCallButton.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    alignMenu: {
      type: 'dropdown',
      value: 'end',
      options: ['start', 'end', 'center'],
      label: 'Align Menu'
    }
  });

  return (
    <NewCallButton alignMenu={state.alignMenu.value} />
  );
}