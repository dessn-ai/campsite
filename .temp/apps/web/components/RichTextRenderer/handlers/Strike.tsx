import { NodeHandler } from "./index.ts";
export const Strike: NodeHandler = (props) => {
    return <span className='line-through'>{props.children}</span>;
};
