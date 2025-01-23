import { NodeHandler } from "./index.ts";
export const Bold: NodeHandler = (props) => {
    return <strong>{props.children}</strong>;
};
