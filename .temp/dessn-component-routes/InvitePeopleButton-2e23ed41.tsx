import React from 'react';
import { InvitePeopleButton } from '../apps/web/components/People/InvitePeopleButton.tsx';

import { useParentState } from '../useIframeState.ts';

export default function Preview() {
  const [state, setState] = useParentState({
    variant: {
      type: 'dropdown',
      value: 'primary',
      options: ['base', 'primary', 'flat', 'plain', 'destructive', 'important', 'brand', 'onboarding', 'text', 'none'],
      label: 'Variant'
    },
    label: {
      type: 'string',
      value: 'Invite people',
      label: 'Label'
    },
    fullWidth: {
      type: 'boolean',
      value: false,
      label: 'Full Width'
    },
    size: {
      type: 'dropdown',
      value: 'base',
      options: ['base', 'sm', 'large'],
      label: 'Size'
    }
  });

  return (
    <InvitePeopleButton
      variant={state.variant.value}
      label={state.label.value}
      fullWidth={state.fullWidth.value}
      size={state.size.value}
    />
  );
}