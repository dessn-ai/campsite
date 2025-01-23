import { NodeHandler } from "./index.ts";
export const BulletList: NodeHandler = (props) => {
    return <ul>{props.children}</ul>;
};
