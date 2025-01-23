import { useState } from 'react';
import toast from 'react-hot-toast';
import { Project } from "../../../../../packages/types/generated.ts";
import { Button } from "../../../../../packages/ui/src/Button/index.tsx";
import { RadioGroup, RadioGroupItem } from "../../../../../packages/ui/src/Radio/index.tsx";
import * as Dialog from "../../../../../packages/ui/src/Dialog/index.tsx";
import { UIText } from "../../../../../packages/ui/src/Text/index.tsx";
import { useCreateProjectSubscription } from "../../../hooks/useCreateProjectSubscription.ts";
import { useDeleteProjectSubscription } from "../../../hooks/useDeleteProjectSubscription.ts";
interface ProjectNotificationsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: Project;
}
export function ProjectNotificationsDialog({ open, onOpenChange, project }: ProjectNotificationsDialogProps) {
    const [value, setValue] = useState<string>(project.viewer_subscription);
    const createProjectSubscription = useCreateProjectSubscription(project.id);
    const deleteProjectSubscription = useDeleteProjectSubscription(project.id);
    function onSave() {
        if (value === 'none') {
            deleteProjectSubscription.mutate(undefined, {
                onSuccess: () => {
                    toast('Unsubscribed from notifications');
                    onOpenChange(false);
                }
            });
        }
        else if (value === 'new_posts') {
            createProjectSubscription.mutate({ cascade: false }, {
                onSuccess: () => {
                    toast('Subscribed to new posts');
                    onOpenChange(false);
                }
            });
        }
        else if (value === 'posts_and_comments') {
            createProjectSubscription.mutate({ cascade: true }, {
                onSuccess: () => {
                    toast('Subscribed to posts and comments');
                    onOpenChange(false);
                }
            });
        }
    }
    return (<Dialog.Root open={open} onOpenChange={onOpenChange} size='sm'>
      <Dialog.Header>
        <Dialog.Title>Channel notifications</Dialog.Title>
      </Dialog.Header>

      <Dialog.Content>
        <Dialog.Description className='sr-only'>
          Select when you’d like to be notified about new content in {project.name}.
        </Dialog.Description>

        <RadioGroup loop className='flex flex-col gap-3' orientation='vertical' value={value} onValueChange={setValue}>
          <RadioGroupItem value='posts_and_comments'>
            <div className='flex flex-col gap-0.5'>
              <UIText weight='font-medium'>Posts and comments</UIText>
              <UIText secondary size='text-xs'>
                Notify me about every new post and comment — I don’t want to miss anything.
              </UIText>
            </div>
          </RadioGroupItem>
          <RadioGroupItem value='new_posts'>
            <div className='flex flex-col gap-0.5'>
              <UIText weight='font-medium'>New posts</UIText>
              <UIText secondary size='text-xs'>
                Notify me when someone shares a new post.
              </UIText>
            </div>
          </RadioGroupItem>
          <RadioGroupItem value='none'>
            <div className='flex flex-col gap-0.5'>
              <UIText weight='font-medium'>None</UIText>
              <UIText secondary size='text-xs'>
                Only notify me when mentioned.
              </UIText>
            </div>
          </RadioGroupItem>
        </RadioGroup>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.TrailingActions>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={onSave} disabled={createProjectSubscription.isPending || deleteProjectSubscription.isPending}>
            Save
          </Button>
        </Dialog.TrailingActions>
      </Dialog.Footer>
    </Dialog.Root>);
}
