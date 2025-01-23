import { useMemo } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Extensions, generateJSON, JSONContent } from '@tiptap/core';
import { ErrorBoundary } from "../../../../packages/ui/src/index.tsx";
import { Blockquote } from "./handlers/Blockquote.tsx";
import { CodeBlock } from "./handlers/CodeBlock.tsx";
import { Hardbreak } from "./handlers/Hardbreak.tsx";
import { InlineResourceMention } from "./handlers/InlineResourceMention.tsx";
import { PostNoteAttachment } from "./handlers/PostNoteAttachment.tsx";
import { RelativeTime } from "./handlers/RelativeTime.tsx";
import { PostHandlersOptions } from "./handlers/index.ts";
import { Bold } from "./handlers/Bold.tsx";
import { BulletList } from "./handlers/BulletList.tsx";
import { Code } from "./handlers/Code.tsx";
import { Details } from "./handlers/Details.tsx";
import { DetailsContent } from "./handlers/DetailsContent.tsx";
import { DetailsSummary } from "./handlers/DetailsSummary.tsx";
import { Heading } from "./handlers/Heading.tsx";
import { HorizontalRule } from "./handlers/HorizontalRule.tsx";
import { Italic } from "./handlers/Italic.tsx";
import { LinkUnfurl } from "./handlers/LinkUnfurl.tsx";
import { ListItem } from "./handlers/ListItem.tsx";
import { MediaGallery } from "./handlers/MediaGallery.tsx";
import { Mention } from "./handlers/Mention.tsx";
import { OrderedList } from "./handlers/OrderedList.tsx";
import { Paragraph } from "./handlers/Paragraph.tsx";
import { Reaction } from "./handlers/Reaction.tsx";
import { Strike } from "./handlers/Strike.tsx";
import { TaskItem } from "./handlers/TaskItem.tsx";
import { TaskList } from "./handlers/TaskList.tsx";
import { Text } from "./handlers/Text.tsx";
import { Underline } from "./handlers/Underline.tsx";
function RenderBlock({ node, extensions, options }: {
    node: JSONContent;
    extensions: Extensions;
    options?: PostHandlersOptions;
}): JSX.Element {
    const children: JSX.Element[] = [];
    node.content &&
        node.content.forEach((child, ix) => {
            children.push(
            // eslint-disable-next-line react/no-array-index-key
            <RenderBlock node={child} extensions={extensions} options={options} key={`${child.type}-${ix}`}/>);
        });
    const props = { node, children };
    switch (node.type) {
        // Core Tiptap nodes
        case 'blockquote':
            return <Blockquote {...props}/>;
        case 'bold':
            return <Bold {...props}/>;
        case 'bulletList':
            return <BulletList {...props}/>;
        case 'code':
            return <Code {...props}/>;
        case 'details':
            return <Details {...props}/>;
        case 'detailsContent':
            return <DetailsContent {...props}/>;
        case 'detailsSummary':
            return <DetailsSummary {...props}/>;
        case 'hardBreak':
            return <Hardbreak {...props}/>;
        case 'heading':
            return <Heading {...props}/>;
        case 'horizontalRule':
            return <HorizontalRule {...props}/>;
        case 'italic':
            return <Italic {...props}/>;
        case 'listItem':
            return <ListItem {...props}/>;
        case 'orderedList':
            return <OrderedList {...props}/>;
        case 'paragraph':
            return <Paragraph {...props}/>;
        case 'strike':
            return <Strike {...props}/>;
        case 'taskItem':
            return <TaskItem {...props} {...options?.taskItem}/>;
        case 'taskList':
            return <TaskList {...props}/>;
        case 'text':
            return <Text {...props}/>;
        case 'underline':
            return <Underline {...props}/>;
        // Campsite custom nodes
        case 'codeBlock':
            return <CodeBlock {...props}/>;
        case 'linkUnfurl':
            return <LinkUnfurl {...props}/>;
        case 'mention':
            return <Mention {...props}/>;
        case 'postNoteAttachment':
            return <PostNoteAttachment {...props} {...options?.postNoteAttachment}/>;
        case 'reaction':
            return <Reaction {...props}/>;
        case 'mediaGallery':
            return <MediaGallery {...props} {...options?.mediaGallery}/>;
        case 'resourceMention':
            return <InlineResourceMention {...props}/>;
        case 'relativeTime':
            return <RelativeTime {...props}/>;
        default:
            // unlikely that we reach this since every TipTap node should have a type
            Sentry.captureException(new Error(`Missing node type in RichTextRenderer`), { extra: { node } });
            return <></>;
    }
}
export function RichTextRenderer({ content, extensions, options }: {
    content: string;
    extensions: Extensions;
    options?: PostHandlersOptions;
}) {
    const output = useMemo(() => {
        return generateJSON(content, extensions) as JSONContent;
    }, [content, extensions]);
    return (<ErrorBoundary fallback={<div className='text-secondary italic'>Sorry, there was an error rendering this content.</div>}>
      <>
        {output.content?.map((node, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <RenderBlock node={node} extensions={extensions} options={options} key={`${node.type}-${idx}`}/>))}
      </>
    </ErrorBoundary>);
}
