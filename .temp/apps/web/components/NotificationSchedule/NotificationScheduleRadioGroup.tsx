import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioGroup } from "../../../../packages/ui/src/Radio/index.tsx";
import { cn } from "../../../../packages/ui/src/utils/index.ts";
export function NotificationScheduleRadioGroup({ className, children, ...rest }: React.PropsWithChildren & Pick<React.ComponentPropsWithoutRef<typeof RadioGroup>, 'className'>) {
    const { watch, trigger, setValue } = useFormContext();
    return (<RadioGroup loop aria-label='Notification schedule type' className={cn('flex flex-col gap-3', className)} orientation='vertical' value={watch('type')} onValueChange={(newValue) => {
            setValue('type', newValue);
            trigger(['days', 'start_time']);
        }} {...rest}>
      {children}
    </RadioGroup>);
}
