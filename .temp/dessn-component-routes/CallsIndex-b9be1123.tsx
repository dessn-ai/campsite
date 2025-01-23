import React from 'react';
import { CallsIndex } from '../apps/web/components/Calls/index.tsx';

import { useParentState } from '../useIframeState.ts';
import { useForm } from 'react-hook-form';

export default function Preview() {
  const form = useForm();
  const [state] = useParentState({
    // Since this component doesn't take any props, we don't need to define any state
  });

  return <CallsIndex />;
}