import { NodeHandler } from "./index.ts";
export const Blockquote: NodeHandler = (props) => {
    return <blockquote>{props.children}</blockquote>;
};
