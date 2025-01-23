import { COMMUNITY_SLUG } from "../../../packages/config/src/index.ts";
import { useScope } from "../contexts/scope.tsx";
export function useIsCommunity() {
    const { scope } = useScope();
    return scope === COMMUNITY_SLUG;
}
