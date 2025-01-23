import React from 'react';
import { Call } from "../../../../packages/types/generated.ts";
import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { DotsHorizontal } from "../../../../packages/ui/src/Icons/index.tsx";
interface CallOverflowMenuProps extends React.PropsWithChildren {
    type: 'dropdown' | 'context';
    call: Call;
}
export function CallOverflowMenu({ children, type, call }: CallOverflowMenuProps) {
    return (<div>
      {type === 'dropdown' ? (<Button variant='plain' iconOnly={<DotsHorizontal />} accessibilityLabel='Call options'/>) : (<div>{children}</div>)}
    </div>);
}
