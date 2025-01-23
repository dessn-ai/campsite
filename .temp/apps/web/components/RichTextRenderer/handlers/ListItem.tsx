import { NodeHandler } from "./index.ts";
export const ListItem: NodeHandler = (props) => {
    return <li>{props.children}</li>;
};
