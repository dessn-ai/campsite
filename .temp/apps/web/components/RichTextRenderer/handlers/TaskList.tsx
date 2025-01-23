import { NodeHandler } from "./index.ts";
export const TaskList: NodeHandler = (props) => {
    return <ul className='task-list'>{props.children}</ul>;
};
