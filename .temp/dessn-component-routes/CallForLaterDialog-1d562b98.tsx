import React from 'react';
import { CallForLaterDialog } from '../apps/web/components/Calls/CallForLaterDialog.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    open: {
      type: 'boolean',
      value: true,
      label: 'Dialog Open'
    }
  });

  return (
    <CallForLaterDialog
      open={state.open.value}
      onOpenChange={(open) => setState('open', open)}
    />
  );
}