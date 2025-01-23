import { MessageThread } from "../../../../packages/types/index.ts";
import { LayeredHotkeys } from "../../../../packages/ui/src/DismissibleLayer/index.tsx";
import { FavoriteButton } from "../FavoriteButton.tsx";
import { useCreateThreadFavorite } from "../../hooks/useCreateThreadFavorite.ts";
import { useDeleteThreadFavorite } from "../../hooks/useDeleteThreadFavorite.ts";
export function ChatFavoriteButton({ thread, shortcutEnabled = false }: {
    thread: MessageThread;
    shortcutEnabled?: boolean;
}) {
    const { mutate: createFavorite, isPending: isCreatePending } = useCreateThreadFavorite();
    const { mutate: deleteFavorite, isPending: isDeletePending } = useDeleteThreadFavorite();
    const isPending = isCreatePending || isDeletePending;
    return (<>
      {shortcutEnabled && (<LayeredHotkeys keys='alt+f' callback={() => {
                if (thread.viewer_has_favorited) {
                    deleteFavorite(thread.id);
                }
                else {
                    createFavorite(thread);
                }
            }}/>)}

      <FavoriteButton hasFavorited={thread.viewer_has_favorited} onFavorite={() => createFavorite(thread)} onRemoveFavorite={() => deleteFavorite(thread.id)} disabled={isPending} shortcutEnabled={shortcutEnabled}/>
    </>);
}
