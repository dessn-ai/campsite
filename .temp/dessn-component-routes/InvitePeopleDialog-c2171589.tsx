import React from 'react'

import { InvitePeopleDialog } from '../apps/web/components/People/InvitePeopleDialog'
import { ScopeProvider } from '../apps/web/contexts/scope'
import { useIframeState, useParentState } from '../useIframeState'

export default function Preview() {
  const [state, setState] = useParentState({
    open: {
      type: 'boolean',
      value: true,
      label: 'Dialog Open'
    }
  })

  const handleOpenChange = (open: boolean) => {
    setState('open', open)
  }

  const mockScope = {
    organizationId: 'mock-org-id'
  }

  return (
    <ScopeProvider value={mockScope}>
      <div>
        <button onClick={() => setState('open', true)}>Open Dialog</button>
        <InvitePeopleDialog open={state.open.value} onOpenChange={handleOpenChange} />
      </div>
    </ScopeProvider>
  )
}
