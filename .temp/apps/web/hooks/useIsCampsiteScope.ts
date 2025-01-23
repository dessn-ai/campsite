import { CAMPSITE_SCOPE } from "../../../packages/config/src/index.ts";
import { useScope } from "../contexts/scope.tsx";
export function useIsCampsiteScope() {
    const { scope } = useScope();
    return { isCampsiteScope: scope === CAMPSITE_SCOPE };
}
