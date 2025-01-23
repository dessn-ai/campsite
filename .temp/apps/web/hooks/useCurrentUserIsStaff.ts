import { useGetCurrentUser } from "./useGetCurrentUser.ts";
export function useCurrentUserIsStaff() {
    const { data: currentUser } = useGetCurrentUser();
    return !!currentUser?.staff;
}
