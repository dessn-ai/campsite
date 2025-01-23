import { useScope } from "../contexts/scope.tsx";
import { useStoredState } from "./useStoredState.ts";
export function useScopedStorage<T>(key: string, initialValue: T) {
    const { scope } = useScope();
    return useStoredState(`${scope}:${key}`, initialValue);
}
