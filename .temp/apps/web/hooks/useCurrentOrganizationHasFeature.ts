import { Organization } from "../../../packages/types/index.ts";
import { useGetCurrentOrganizationFeatures } from "./useGetOrganizationFeatures.ts";
export type OrgFeatures = NonNullable<Organization['features']>[0];
export function useCurrentOrganizationHasFeature(feature: OrgFeatures) {
    const { data } = useGetCurrentOrganizationFeatures();
    return !!data?.features?.includes(feature);
}
