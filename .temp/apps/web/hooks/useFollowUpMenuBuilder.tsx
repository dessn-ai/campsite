import { createElement, useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Call, Comment, Note, Post } from "../../../packages/types/generated.ts";
import { AlarmCheckIcon, AlarmIcon, CloseIcon } from "../../../packages/ui/src/Icons/index.tsx";
import { buildMenuItems } from "../../../packages/ui/src/Menu/index.ts";
import { getFollowUpDates } from "../components/FollowUp/index.ts";
import { useFollowUpActions } from "./useFollowUpActions.ts";
import { useGetCurrentUser } from "./useGetCurrentUser.ts";
export function useFollowUpMenuBuilder(subject: Post | Note | Comment | Call) {
    const { data: currentUser } = useGetCurrentUser();
    const { createFollowUp, deleteFollowUp } = useFollowUpActions({
        subject_id: subject.id,
        subject_type: subject.type_name
    });
    const followUpDates = getFollowUpDates({ includeNow: currentUser?.staff });
    const viewerFollowUp = subject.follow_ups.find((followUp) => followUp.belongs_to_viewer);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const createFollowUpOptions = buildMenuItems([
        ...buildMenuItems(followUpDates.map(({ date, label, formatStr }) => ({
            rightSlot: createElement('span', { className: 'text-tertiary flex flex-row gap-2' }, format(date, formatStr)),
            onSelect: () => {
                toast(`Follow up scheduled for ${format(date, formatStr)}`);
                createFollowUp({ show_at: date.toISOString() });
            },
            label: label,
            type: 'item'
        }))),
        {
            type: 'item',
            label: 'Custom...',
            onSelect: () => setCalendarOpen(true)
        }
    ]);
    const deleteFollowUpOptions = buildMenuItems([
        {
            type: 'item',
            label: viewerFollowUp ? `${format(new Date(viewerFollowUp.show_at), 'E M/d, h:mmaaa')}` : '',
            onSelect: () => {
                toast('Follow up removed');
                deleteFollowUp({ id: viewerFollowUp?.id ?? '' });
            },
            rightSlot: <CloseIcon />
        }
    ]);
    const followUpMenuItem = buildMenuItems([
        {
            type: 'sub',
            leftSlot: viewerFollowUp ? <AlarmCheckIcon /> : <AlarmIcon />,
            label: 'Follow up',
            items: viewerFollowUp ? deleteFollowUpOptions : createFollowUpOptions
        }
    ])[0];
    return { followUpMenuItem, calendarOpen, setCalendarOpen, createFollowUp };
}
