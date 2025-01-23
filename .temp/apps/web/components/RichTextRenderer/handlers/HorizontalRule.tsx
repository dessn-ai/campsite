import { NodeHandler } from "./index.ts";
export const HorizontalRule: NodeHandler = () => {
    return (<div data-hr-wrapper='true'>
      <hr />
    </div>);
};
