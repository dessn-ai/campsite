import { ResourceMentionOptions } from "../../../../../packages/editor/src/index.ts";
import { Link } from "../../../../../packages/ui/src/Link/index.tsx";
import { ResourceMentionView } from "../../InlineResourceMentionRenderer.tsx";
import { NodeHandler } from "./index.ts";
export const InlineResourceMention: NodeHandler<ResourceMentionOptions> = ({ node }) => {
    const href = node.attrs?.href;
    return (<Link href={href}>
      <ResourceMentionView href={href}/>
    </Link>);
};
