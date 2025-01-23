import { Button } from "../../../../packages/ui/src/Button/index.tsx";
import { DropdownMenuProps } from "../../../../packages/ui/src/DropdownMenu/index.tsx";
import { ChevronDownIcon } from "../../../../packages/ui/src/Icons/index.tsx";
import { NewCallDropdownMenu } from "./NewCallDropdownMenu.tsx";
interface Props {
    alignMenu?: DropdownMenuProps['align'];
}
export function NewCallButton({ alignMenu = 'end' }: Props) {
    return (<NewCallDropdownMenu align={alignMenu} trigger={<Button variant='primary' rightSlot={<ChevronDownIcon />}>
          New call
        </Button>}/>);
}
