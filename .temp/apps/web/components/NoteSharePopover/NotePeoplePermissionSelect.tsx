import { Permission } from "../../../../packages/types/index.ts";
import { Select } from "../../../../packages/ui/src/index.tsx";
type PermissionAction = Permission['action'] | 'none';
export const permissionActionToLabel = (action: PermissionAction) => {
    switch (action) {
        case 'none':
            return 'No access';
        case 'view':
            return 'View + comment';
        case 'edit':
            return 'Edit';
    }
};
export const PERMISSION_ACTIONS = (allowNone: boolean = true) => {
    let defaultActions = ['edit', 'view'];
    if (allowNone) {
        defaultActions.unshift('none');
    }
    return (defaultActions as PermissionAction[]).map((action) => ({
        value: action,
        label: permissionActionToLabel(action)
    }));
};
interface Props {
    selected: PermissionAction;
    onChange: (action: PermissionAction) => void;
    disabled?: boolean;
    allowNone?: boolean;
}
export function NotePeoplePermissionSelect({ selected, onChange, disabled = false, allowNone }: Props) {
    return (<Select disabled={disabled} value={selected} onChange={(value) => onChange(value as PermissionAction)} options={PERMISSION_ACTIONS(!!allowNone)} showCheckmark align='end' popoverWidth={180}/>);
}
