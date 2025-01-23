import { NodeHandler } from "./index.ts";
export const Details: NodeHandler = ({ children }) => {
    return <details className='ml-4'>{children}</details>;
};
