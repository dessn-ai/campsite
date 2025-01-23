import { NodeHandler } from "./index.ts";
export const OrderedList: NodeHandler = (props) => {
    const { start } = props.node.attrs || {};
    return <ol start={start}>{props.children}</ol>;
};
