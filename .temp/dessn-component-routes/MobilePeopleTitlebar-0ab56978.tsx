import React from 'react';
import { MobilePeopleTitlebar } from '../apps/web/components/People/PeopleTitlebar.tsx';

import { useParentState } from '../useIframeState.ts';
import { Provider } from 'jotai';

export default function Preview() {
  const [state, setState] = useParentState({
    className: {
      type: 'string',
      value: 'flex h-auto gap-1 py-1.5 lg:hidden',
      label: 'Container Class Name'
    }
  });

  return (
    <Provider>
      <MobilePeopleTitlebar />
    </Provider>
  );
}