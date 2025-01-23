import { OrgFeatures, useCurrentOrganizationHasFeature } from "./useCurrentOrganizationHasFeature.ts";
import { useCurrentUserHasFeature, UserFeatures } from "./useCurrentUserHasFeature.ts";
export function useCurrentUserOrOrganizationHasFeature(feature: UserFeatures & OrgFeatures) {
    const currentUserHasFeature = useCurrentUserHasFeature(feature);
    const currentOrganizationHasFeature = useCurrentOrganizationHasFeature(feature);
    return currentUserHasFeature || currentOrganizationHasFeature;
}
