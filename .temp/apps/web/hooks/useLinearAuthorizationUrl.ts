import { LINEAR_CALLBACK_URL, LINEAR_CLIENT_ID } from "../../../packages/config/src/index.ts";
import { useGetCurrentOrganization } from "./useGetCurrentOrganization.ts";
import { useIntegrationAuthUrl } from "./useIntegrationAuthUrl.ts";
export const linearConnectionSuccessPath = '/linear-connection-success';
export const useLinearAuthorizationUrl = () => {
    const getCurrentOrganization = useGetCurrentOrganization();
    const organization = getCurrentOrganization.data;
    const params = new URLSearchParams();
    params.set('scope', 'issues:create');
    params.set('state', organization?.id || '');
    params.set('redirect_uri', LINEAR_CALLBACK_URL);
    params.set('response_type', 'code');
    params.set('actor', 'application');
    params.set('prompt', 'consent');
    params.set('client_id', LINEAR_CLIENT_ID);
    return useIntegrationAuthUrl({
        auth_url: `https://linear.app/oauth/authorize?${params.toString()}`,
        success_path: linearConnectionSuccessPath
    });
};
