import { UserPreferences } from "../../../packages/types/generated.ts";
import { useGetCurrentUser } from "./useGetCurrentUser.ts";
export function usePostsDisplayPreference(): UserPreferences['posts_density'] {
    const { data: currentUser } = useGetCurrentUser();
    const hasPreference = currentUser?.preferences.posts_density;
    const prefersCompact = !hasPreference || currentUser?.preferences.posts_density === 'compact';
    if (!hasPreference || prefersCompact)
        return 'compact';
    return 'comfortable';
}
