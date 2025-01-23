import { TimelineEvent } from "../../../../packages/types/generated.ts";
import { UIText } from "../../../../packages/ui/src/Text/index.tsx";
import { AuthorLink } from "../AuthorLink.tsx";
import { MemberHovercard } from "../InlinePost/MemberHovercard.tsx";
export function TimelineEventMemberActor({ timelineEvent }: {
    timelineEvent: TimelineEvent;
}) {
    const { member_actor } = timelineEvent;
    if (!member_actor)
        return null;
    return (<MemberHovercard username={member_actor.user.username}>
      <AuthorLink user={member_actor.user} className='relative hover:underline'>
        <UIText element='span' primary weight='font-medium' size='text-inherit'>
          {member_actor.user.display_name}
        </UIText>
      </AuthorLink>
    </MemberHovercard>);
}
