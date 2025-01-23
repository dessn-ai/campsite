import { useRouter } from 'next/router';
import { ALL_SLACK_SCOPES, RAILS_API_URL } from "../../../packages/config/src/index.ts";
import { PublicOrganization } from "../../../packages/types/index.ts";
import { useScope } from "../contexts/scope.tsx";
import { useIntegrationAuthUrl } from "./useIntegrationAuthUrl.ts";
import { useSlackAuthorizationUrl } from "./useSlackAuthorizationUrl.ts";
export const useSlackBroadcastsAuthorizationUrl = ({ organization, enableNotifications }: {
    organization?: PublicOrganization;
    enableNotifications?: boolean;
}) => {
    const { asPath } = useRouter();
    const { scope } = useScope();
    const organizationSlug = organization?.slug || scope;
    const redirectUri = `${RAILS_API_URL}/v1/organizations/${organizationSlug}/integrations/slack/callback`;
    const auth_url = useSlackAuthorizationUrl({ scopes: ALL_SLACK_SCOPES, redirectUri });
    return useIntegrationAuthUrl({ auth_url, success_path: asPath, enable_notifications: enableNotifications });
};
