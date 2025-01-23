import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, ButtonProps } from "../../../../packages/ui/src/Button/index.tsx";
import { ViewerRoleCreateNoteUpsell } from "./ViewerRoleCreateNoteUpsell.tsx";
import { useCreateNewNote } from "../../hooks/useCreateNote.ts";
import { useGetCurrentOrganization } from "../../hooks/useGetCurrentOrganization.ts";
export function NewNoteButton({ size = 'base' }: {
    size?: ButtonProps['size'];
}) {
    const { handleCreate, isPending } = useCreateNewNote();
    const { data: currentOrganization } = useGetCurrentOrganization();
    const [showViewerUpsellDialog, setShowViewerUpsellDialog] = useState(false);
    const router = useRouter();
    const project_id = router.query.projectId as string | undefined;
    return (<>
      <Button onClick={() => {
            if (!currentOrganization?.viewer_can_create_note) {
                setShowViewerUpsellDialog(true);
            }
            else {
                handleCreate(project_id ? { project_id } : undefined);
            }
        }} disabled={isPending} variant='primary' size={size}>
        New doc
      </Button>
      <ViewerRoleCreateNoteUpsell open={showViewerUpsellDialog} onOpenChange={setShowViewerUpsellDialog}/>
    </>);
}
