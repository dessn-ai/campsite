import * as SettingsSection from "../SettingsSection/index.tsx";
import { useApproveInboundMembershipRequest } from "../../hooks/useApproveInboundMembershipRequest.ts";
import { useDeclineInboundMembershipRequest } from "../../hooks/useDeclineInboundMembershipRequest.ts";
import { useGetInboundMembershipRequests } from "../../hooks/useGetInboundMembershipRequests.ts";
import { OrganizationMembershipRequest } from "../../../../packages/types/index.ts";
import { Avatar, Button, Table, TableRow, UIText } from "../../../../packages/ui/src/index.tsx";
import { useViewerIsAdmin } from "../../hooks/useViewerIsAdmin.ts";
interface Props {
    requests: OrganizationMembershipRequest[];
}
export function InboundRequests() {
    const viewerIsAdmin = useViewerIsAdmin();
    const { data } = useGetInboundMembershipRequests({ enabled: viewerIsAdmin });
    const requests = data?.data;
    if (!viewerIsAdmin)
        return null;
    if (!requests?.length)
        return null;
    return (<SettingsSection.Section className='shadow-sm'>
      <SettingsSection.Header>
        <SettingsSection.Title>Needs review</SettingsSection.Title>
      </SettingsSection.Header>

      <SettingsSection.Description>
        These people need approval to join your organization.
        <br />
        Approved members will have the Viewer role.
      </SettingsSection.Description>

      <SettingsSection.Separator />

      <RequestsTable requests={requests}/>
    </SettingsSection.Section>);
}
function RequestsTable(props: Props) {
    const { requests } = props;
    return (<>
      <div className='-mt-3 flex flex-col'>
        <RequestsRows requests={requests}/>
      </div>
    </>);
}
interface RequestsRowsProps {
    requests: OrganizationMembershipRequest[];
}
function RequestsRows(props: RequestsRowsProps) {
    const { requests } = props;
    const approveRequest = useApproveInboundMembershipRequest();
    const declineRequest = useDeclineInboundMembershipRequest();
    const handleApprove = async (request: OrganizationMembershipRequest) => {
        await approveRequest.mutate({ id: request.id });
    };
    const handleDecline = async (request: OrganizationMembershipRequest) => {
        await declineRequest.mutate({ id: request.id });
    };
    return (<Table>
      {requests.map((request) => (<TableRow key={request.id}>
          <div className='flex-1 text-sm'>
            <div className='flex items-center'>
              <div className='h-10 w-10 flex-shrink-0'>
                <Avatar name={request.user.display_name} size='lg' urls={request.user.avatar_urls}/>
              </div>
              <div className='ml-4'>
                <UIText weight='font-medium' selectable>
                  {request.user.display_name}
                </UIText>
                <UIText tertiary>{request.user.email}</UIText>
              </div>
            </div>
          </div>
          <div className='flex w-full items-center justify-end gap-1.5 sm:w-auto'>
            <Button onClick={() => handleDecline(request)} variant='flat' fullWidth>
              Decline
            </Button>
            <Button onClick={() => handleApprove(request)} fullWidth variant='important'>
              Approve
            </Button>
          </div>
        </TableRow>))}
    </Table>);
}
