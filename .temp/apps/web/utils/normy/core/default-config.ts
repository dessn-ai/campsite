import { NormalizerConfig } from "./types.ts";
export const defaultConfig: Required<NormalizerConfig> = {
    getNormalizationObjectKey: (obj) => obj.id as string | undefined,
    devLogging: false,
    structuralSharing: true
};
