import { Button, StarFilledIcon, StarOutlineIcon } from "../../../packages/ui/src/index.tsx";
import { cn } from "../../../packages/ui/src/utils/index.ts";
interface Props {
    hasFavorited: boolean | undefined;
    onFavorite: () => void;
    onRemoveFavorite: () => void;
    disabled?: boolean;
    variant?: 'base' | 'plain';
    shortcutEnabled?: boolean;
}
export function FavoriteButton({ variant = 'plain', hasFavorited = false, onFavorite, onRemoveFavorite, disabled, shortcutEnabled }: Props) {
    return (<Button variant={variant} className={cn({
            'hover:text-primary text-yellow-400': hasFavorited,
            'text-quaternary hover:text-primary': !hasFavorited
        })} iconOnly={hasFavorited ? <StarFilledIcon /> : <StarOutlineIcon />} onClick={() => {
            if (hasFavorited) {
                onRemoveFavorite();
            }
            else {
                onFavorite();
            }
        }} tooltip={hasFavorited ? 'Unfavorite' : 'Favorite'} tooltipShortcut={shortcutEnabled ? 'alt+f' : undefined} disabled={disabled || false} accessibilityLabel={hasFavorited ? 'Unfavorite' : 'Favorite'}/>);
}
