import { createElement } from 'react';
import { SyncProject } from "../../../packages/types/generated.ts";
import { SelectOption } from "../../../packages/ui/src/Select/index.ts";
import { ProjectAccessory } from "../components/Projects/ProjectAccessory.tsx";
export function projectToOption(project: SyncProject): SelectOption {
    return {
        value: project.id,
        label: project.name,
        leftSlot: createElement(ProjectAccessory, { project: project })
    };
}
