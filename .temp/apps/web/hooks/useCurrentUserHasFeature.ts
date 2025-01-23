import { CurrentUser } from "../../../packages/types/index.ts";
import { useGetCurrentUser } from "./useGetCurrentUser.ts";
export type UserFeatures = CurrentUser['features'][0];
export function useCurrentUserHasFeature(feature: UserFeatures) {
    const { data: currentUser } = useGetCurrentUser();
    return currentUser?.features?.includes(feature) as boolean;
}
