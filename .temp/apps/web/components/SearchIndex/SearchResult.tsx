import { cn, Link } from "../../../../packages/ui/src/index.tsx";
import { getItemRowDOMId } from "./SearchIndex.tsx";
import { useCanHover } from "../../hooks/useCanHover.ts";
interface SearchResultProps {
    id: string;
    href: string;
    onFocus: React.FocusEventHandler<HTMLAnchorElement>;
    onPointerMove: React.PointerEventHandler<HTMLAnchorElement>;
    children: React.ReactNode;
    className?: string;
}
export function SearchResult({ id, href, onFocus, onPointerMove, children, className }: SearchResultProps) {
    const canHover = useCanHover();
    return (<li className={cn('group relative grid min-h-12 scroll-m-1 grid-cols-[24px,_1fr] gap-3 rounded-lg px-3 py-2.5', 'data-[state="open"]:bg-tertiary', {
            'focus-within:bg-tertiary': canHover
        }, className)}>
      <Link draggable={false} id={getItemRowDOMId({ id })} href={href} className='absolute inset-0 z-0 rounded-lg focus:ring-0' onFocus={onFocus} onPointerMove={onPointerMove}/>

      {children}
    </li>);
}
