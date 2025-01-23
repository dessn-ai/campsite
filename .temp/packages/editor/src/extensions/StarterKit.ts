import { Document } from "./Document.ts";
import { History } from "./History.ts";
import { Paragraph } from "./Paragraph.ts";
import { Text } from "./Text.ts";
export const StarterKit = () => {
    return [Document, History, Paragraph, Text];
};
