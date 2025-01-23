import { User } from "../../../packages/types/generated.ts";
import { Link, LinkProps } from "../../../packages/ui/src/Link/index.tsx";
import { useScope } from "../contexts/scope.tsx";
export function AuthorLink({ user, children, ...linkProps }: Omit<LinkProps, 'href'> & {
    user: User;
    children: React.ReactNode;
}) {
    const { scope } = useScope();
    // link is omitted until if/when integrations have profile pages
    if (user.integration)
        return <>{children}</>;
    return (<Link {...linkProps} href={`/${scope}/people/${user.username}`}>
      {children}
    </Link>);
}
