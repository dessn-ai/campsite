import { TimelineEvent } from "../../../../packages/types/generated.ts";
import { RelativeTime } from "../../../../packages/ui/src/RelativeTime/index.tsx";
import { UIText } from "../../../../packages/ui/src/Text/index.tsx";
import { Tooltip } from "../../../../packages/ui/src/Tooltip/index.tsx";
import { longTimestamp } from "../../utils/timestamp.ts";
interface TimelineEventCreatedAtTextProps {
    timelineEvent: TimelineEvent;
}
export function TimelineEventCreatedAtText({ timelineEvent }: TimelineEventCreatedAtTextProps) {
    const createdAtTitle = longTimestamp(timelineEvent.created_at);
    return (<Tooltip label={createdAtTitle}>
      <UIText element='span' quaternary className='ml-1.5' size='text-inherit'>
        <RelativeTime time={timelineEvent.created_at}/>
      </UIText>
    </Tooltip>);
}
