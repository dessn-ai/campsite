import { Button, SearchIcon } from "../../../../packages/ui/src/index.tsx";
import { useScope } from "../../contexts/scope.tsx";
export function SidebarSearchButton() {
    const { scope } = useScope();
    return (<Button iconOnly={<SearchIcon />} accessibilityLabel='Search' tooltip='Search' tooltipShortcut='/' href={`/${scope}/search`} variant='plain'/>);
}
