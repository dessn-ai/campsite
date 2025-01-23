import { useScope } from "../contexts/scope.tsx";
import { useGetCurrentUser } from "./useGetCurrentUser.ts";
import { useGetOrganizationMemberships } from "./useGetOrganizationMemberships.ts";
type Options = {
    orgSlug: string;
};
export function useIsOrganizationMember(options?: Options) {
    const { scope } = useScope();
    const orgSlug = options?.orgSlug ?? scope;
    const { data: currentUser } = useGetCurrentUser();
    const { data: organizations } = useGetOrganizationMemberships({ enabled: !!currentUser?.logged_in });
    return !!organizations?.some(({ organization }) => organization.slug === orgSlug);
}
