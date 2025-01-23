import { Link } from "../../../../packages/ui/src/index.tsx";
import { useScope } from "../../contexts/scope.tsx";
type Props = {
    postId: string;
    hash?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'href'>;
export function PostLink({ postId, hash, ...rest }: Props) {
    const { scope } = useScope();
    return <Link href={`/${scope}/posts/${postId}${hash ?? ''}`} {...rest}/>;
}
