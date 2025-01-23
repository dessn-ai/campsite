import { NodeHandler } from "./index.ts";
export const Code: NodeHandler = (props) => {
    return <code>{props.children}</code>;
};
