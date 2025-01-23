import { useGetCurrentUser } from "./useGetCurrentUser.ts";
export function useCurrentUserIsLoggedIn() {
    const { data: currentUser } = useGetCurrentUser();
    return !!currentUser?.logged_in;
}
