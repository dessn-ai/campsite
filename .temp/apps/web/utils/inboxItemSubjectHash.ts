import { FollowUp, Notification } from "../../../packages/types/index.ts";
export const inboxItemSubjectHash = (inboxItem: Notification | FollowUp) => {
    switch (inboxItem.subject.type) {
        case 'Comment':
            return `comment-${inboxItem.subject.id}`;
        case 'FollowUp':
        case 'Reaction':
            if ('subtarget' in inboxItem) {
                return inboxItem.subtarget?.type === 'Comment' ? `comment-${inboxItem.subtarget.id}` : '';
            }
            break;
        default:
            return undefined;
    }
};
