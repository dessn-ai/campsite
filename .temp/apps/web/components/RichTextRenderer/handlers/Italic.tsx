import { NodeHandler } from "./index.ts";
export const Italic: NodeHandler = (props) => {
    return <em>{props.children}</em>;
};
