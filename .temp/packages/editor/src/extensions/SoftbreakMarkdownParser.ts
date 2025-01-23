import { Extension } from '@tiptap/core';
import { createMarkdownParserSpec } from "../utils/createMarkdownParser.ts";
export const SoftbreakMarkdownParser = Extension.create({
    name: 'softbreakMarkdownParser',
    markdownParseSpec() {
        return createMarkdownParserSpec({ node: 'hardBreak' });
    },
    markdownToken: 'softbreak'
});
