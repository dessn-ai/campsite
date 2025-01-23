import { hasLanguage, Refractor } from 'react-refractor';
import { NodeHandler } from "./index.ts";
export const CodeBlock: NodeHandler = (props) => {
    const { language } = props.node.attrs ?? {};
    // `language` might be explicitly `null` so we need to define the default language here
    const isValidLanguage = hasLanguage(language || 'none');
    return (<Refractor language={isValidLanguage ? language : undefined} plainText={!isValidLanguage} value={props.node.content?.[0].text || ''}/>);
};
