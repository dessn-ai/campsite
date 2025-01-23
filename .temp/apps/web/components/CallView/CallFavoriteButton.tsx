import { Call } from "../../../../packages/types/index.ts";
import { LayeredHotkeys } from "../../../../packages/ui/src/DismissibleLayer/index.tsx";
import { useCreateCallFavorite } from "../../hooks/useCreateCallFavorite.ts";
import { useDeleteCallFavorite } from "../../hooks/useDeleteCallFavorite.ts";
import { FavoriteButton } from "../FavoriteButton.tsx";
interface Props {
    call: Call;
    shortcutEnabled?: boolean;
}
export function CallFavoriteButton({ call, shortcutEnabled = false }: Props) {
    const createFavorite = useCreateCallFavorite();
    const deleteFavorite = useDeleteCallFavorite();
    return (<>
      {shortcutEnabled && (<LayeredHotkeys keys='alt+f' callback={() => {
                if (call.viewer_has_favorited) {
                    deleteFavorite.mutate(call.id);
                }
                else {
                    createFavorite.mutate(call);
                }
            }}/>)}

      <FavoriteButton hasFavorited={call.viewer_has_favorited} onFavorite={() => createFavorite.mutate(call)} onRemoveFavorite={() => deleteFavorite.mutate(call.id)} shortcutEnabled={shortcutEnabled}/>
    </>);
}
