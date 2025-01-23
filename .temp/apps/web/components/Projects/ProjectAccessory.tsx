import { Project } from "../../../../packages/types/index.ts";
import { ArchiveIcon, ChatBubbleIcon, ProjectIcon } from "../../../../packages/ui/src/index.tsx";
import { useCurrentUserOrOrganizationHasFeature } from "../../hooks/useCurrentUserOrOrganizationHasFeature.ts";
interface ProjectAccessoryProps {
    project?: Pick<Project, 'accessory' | 'archived' | 'message_thread_id'>;
}
export function ProjectAccessory({ project }: ProjectAccessoryProps) {
    const hasNoEmojiAccessories = useCurrentUserOrOrganizationHasFeature('no_emoji_accessories');
    const isChatProject = !!project?.message_thread_id;
    if (project?.accessory && !hasNoEmojiAccessories) {
        return (<span className='inline-flex h-5 w-5 items-center justify-center font-[emoji] text-[13px]'>
        {project.accessory}
      </span>);
    }
    return (<span className='h-5 w-5 shrink-0'>
      {project?.archived ? <ArchiveIcon /> : isChatProject ? <ChatBubbleIcon /> : <ProjectIcon />}
    </span>);
}
