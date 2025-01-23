import { figmaRegex } from "../../../regex/src/index.ts";
/**
 * Returns supported 3rd party platforms for inline link attachments.
 */
export function inlineLinkAttachmentType(url: string) {
    if (figmaRegex.test(url))
        return 'figma';
    return null;
}
