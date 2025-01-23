import { NodeHandler } from "./index.ts";
export const Underline: NodeHandler = (props) => {
    return <span className='underline'>{props.children}</span>;
};
