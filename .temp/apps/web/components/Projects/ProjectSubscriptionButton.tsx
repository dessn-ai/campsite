import { useState } from 'react';
import { Project } from "../../../../packages/types/index.ts";
import { BellCheckIcon, BellIcon, Button } from "../../../../packages/ui/src/index.tsx";
import { ProjectNotificationsDialog } from "./ProjectDialogs/ProjectNotificationsDialog.tsx";
interface Props {
    project: Project;
}
export function ProjectSubscriptionButton({ project }: Props) {
    const isSubscribed = project.viewer_has_subscribed;
    const [notificationsDialogOpen, setNotificationsDialogOpen] = useState(false);
    /**
     * Allow users to un/subscribe projects if they are a member.
     * Don't show the button if the project is archived.
     */
    if (!project.viewer_is_member || project.archived)
        return null;
    return (<>
      <ProjectNotificationsDialog project={project} open={notificationsDialogOpen} onOpenChange={setNotificationsDialogOpen}/>
      <Button variant={project.viewer_has_subscribed ? 'flat' : 'base'} iconOnly={isSubscribed ? <BellCheckIcon /> : <BellIcon />} onClick={() => setNotificationsDialogOpen(true)} tooltip={isSubscribed ? 'Disable notifications' : 'Enable notifications'} accessibilityLabel={isSubscribed ? 'Disable notifications' : 'Enable notifications'}/>
    </>);
}
