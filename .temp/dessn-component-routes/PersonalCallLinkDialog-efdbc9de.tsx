import React from 'react';
import { PersonalCallLinkDialog } from '../apps/web/components/Calls/PersonalCallLinkDialog.tsx';

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
    <PersonalCallLinkDialog
      open={state.open.value}
      onOpenChange={handleOpenChange}
    />
  );
}