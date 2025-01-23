import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from "../../../packages/ui/src/Button/index.tsx";
import { ThumbsDownIcon, ThumbsUpIcon } from "../../../packages/ui/src/Icons/index.tsx";
import { UIText } from "../../../packages/ui/src/Text/index.tsx";
import { Tooltip } from "../../../packages/ui/src/Tooltip/index.tsx";
import { cn } from "../../../packages/ui/src/utils/index.ts";
interface Props {
    responseId: string;
    feature: string;
    className?: string;
}
export function GeneratedContentFeedback(props: Props) {
    return <InnerGeneratedContentFeedback key={props.responseId} {...props}/>;
}
function InnerGeneratedContentFeedback({ className }: Props) {
    const [response, setResponse] = useState<null | 'positive' | 'negative'>(null);
    function handleClick(value: 'positive' | 'negative') {
        if (response === value) {
            return;
        }
        setResponse(value);
        toast('Thanks for your feedback!');
    }
    return (<div className={cn('text-secondary flex items-center', className)}>
      <Tooltip label='This content was generated with AI'>
        <UIText inherit size='text-xs' className='mr-2'>
          Was this helpful?
        </UIText>
      </Tooltip>
      <Button size='sm' iconOnly={<ThumbsUpIcon size={16}/>} onClick={() => handleClick('positive')} tooltip='Helpful' accessibilityLabel='Helpful' variant={response === 'positive' ? 'flat' : 'plain'} disabled={!!response}/>
      <Button size='sm' iconOnly={<ThumbsDownIcon size={16}/>} onClick={() => handleClick('negative')} tooltip='Not helpful' accessibilityLabel='Not helpful' variant={response === 'negative' ? 'flat' : 'plain'} disabled={!!response}/>
    </div>);
}
