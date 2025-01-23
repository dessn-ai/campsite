import React from 'react';
import { InvitePeopleDialog } from '../apps/web/components/People/InvitePeopleDialog.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    open: {
      type: 'boolean',
      value: true,
      label: 'Dialog Open'
    }
  });

  const handleOpenChange = (open: boolean) => {
    setState('open', open);
  };

  return (
    <InvitePeopleDialog
      open={state.open.value}
      onOpenChange={handleOpenChange}
    />
  );
}