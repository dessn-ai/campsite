import { Note } from "../../../../packages/types/index.ts";
import { LayeredHotkeys } from "../../../../packages/ui/src/DismissibleLayer/index.tsx";
import { useCreateNoteFavorite } from "../../hooks/useCreateNoteFavorite.ts";
import { useDeleteNoteFavorite } from "../../hooks/useDeleteNoteFavorite.ts";
import { FavoriteButton } from "../FavoriteButton.tsx";
interface Props {
    note: Note;
    shortcutEnabled?: boolean;
}
export function NoteFavoriteButton({ note, shortcutEnabled = false }: Props) {
    const { mutate: createFavorite, isPending: isCreatePending } = useCreateNoteFavorite();
    const { mutate: deleteFavorite, isPending: isDeletePending } = useDeleteNoteFavorite();
    return (<>
      {shortcutEnabled && (<LayeredHotkeys keys='alt+f' callback={() => {
                if (note.viewer_has_favorited) {
                    deleteFavorite(note.id);
                }
                else {
                    createFavorite(note);
                }
            }}/>)}

      <FavoriteButton hasFavorited={note.viewer_has_favorited} onFavorite={() => createFavorite(note)} onRemoveFavorite={() => deleteFavorite(note.id)} disabled={isCreatePending || isDeletePending} shortcutEnabled={shortcutEnabled}/>
    </>);
}
