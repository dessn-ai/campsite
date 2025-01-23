import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useBindChannelEvent } from "./useBindChannelEvent.ts";
import { useGetCurrentOrganization } from "./useGetCurrentOrganization.ts";
import { useIsOrganizationMember } from "./useIsOrganizationMember.ts";
import { useOrganizationChannel } from "./useOrganizationChannel.ts";
import { apiClient } from "../utils/queryClient.ts";
export function useCallsSubscriptions() {
    const queryClient = useQueryClient();
    const isOrgMember = useIsOrganizationMember();
    const { data: organization } = useGetCurrentOrganization({ enabled: isOrgMember });
    const organizationChannel = useOrganizationChannel(organization);
    const invalidateCallsQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: apiClient.organizations.getCalls().baseKey });
    }, [queryClient]);
    useBindChannelEvent(organizationChannel, 'calls-stale', invalidateCallsQuery);
}
