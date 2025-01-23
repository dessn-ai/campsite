import React from 'react'
import { Call } from '@campsite/types/generated'
import { Button } from '@campsite/ui/Button'
import { DotsHorizontal } from '@campsite/ui/Icons'

interface CallOverflowMenuProps extends React.PropsWithChildren {
  type: 'dropdown' | 'context'
  call: Call
}

export function CallOverflowMenu({ children, type, call }: CallOverflowMenuProps) {
  return (
    <div>
      {type === 'dropdown' ? (
        <Button variant='plain' iconOnly={<DotsHorizontal />} accessibilityLabel='Call options' />
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}