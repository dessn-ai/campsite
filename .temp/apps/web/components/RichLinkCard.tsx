import * as Sentry from '@sentry/nextjs';
import { parseCampsiteUrl } from "../../../packages/editor/src/index.ts";
import { CallPreviewCard } from "./PreviewCards/CallPreviewCard.tsx";
import { CommentPreviewCard } from "./PreviewCards/CommentPreviewCard.tsx";
import { NotePreviewCard } from "./PreviewCards/NotePreviewCard.tsx";
import { PostPreviewCard } from "./PreviewCards/PostPreviewCard.tsx";
import { ProjectPreviewCard } from "./PreviewCards/ProjectPreviewCard.tsx";
import { TweetPreview } from "./TweetPreview/index.tsx";
import { useScope } from "../contexts/scope.tsx";
import { LoomPreview } from "./LoomPreview.tsx";
import { OpenGraphCard } from "./OpenGraphCard.tsx";
import { SlimOpenGraphCard } from "./SlimOpenGraphCard.tsx";
import { TellaPreview } from "./TellaPreview/index.ts";
import { ThreadPreview } from "./ThreadPreview/index.tsx";
import { YouTubePreview } from "./YouTubePreview/index.tsx";
interface RichLinkCardProps {
    className?: string;
    url: string;
    interactive?: boolean;
    display?: 'default' | 'slim';
    onForceRemove?: () => void;
}
const HOST_REGEX = {
    twitter: /(www.)?(twitter|x)\.com/i,
    threads: /(www.)?threads\.net/i,
    youtube: /(www.)?youtube\.com/i,
    youtubeShort: /(www.)?youtu\.be/i,
    tella: /(www.)?tella\.tv/i,
    loom: /(www.)?loom\.com/i
};
const PATH_REGEX = {
    twitter: /\/[a-z0-9-_]+\/status\/(?<tweetId>[0-9]+)/i,
    threads: /\/@(?<username>[a-z0-9-_]+)\/post\/(?<postId>[a-z0-9-_]+)/i,
    youtubeShort: /\/(?<videoId>[a-z0-9-_]+)(\?|$)/i,
    tella: /\/video\/(?<videoId>[a-z0-9-_]+)\//i,
    loom: /\/share\/(?<videoId>[0-9a-zA-Z]{22,128})(?:\/.*)?(\?.*)?/i
};
function isTwitterUrl(url: URL) {
    return HOST_REGEX.twitter.test(url.host);
}
function isCampsiteUrl(url: URL) {
    return url.host === location.host || (url.host === 'app.campsite.co' && location.host === 'app.campsite.com');
}
export function RichLinkCard({ className, url: href, onForceRemove, interactive, display = 'default' }: RichLinkCardProps) {
    const { scope } = useScope();
    const parsedUrl = parseCampsiteUrl(href);
    let url: URL | undefined;
    try {
        url = new URL(href);
    }
    catch {
        Sentry.captureException(`Invalid URL: ${href}`);
        return null;
    }
    if (parsedUrl && isCampsiteUrl(url)) {
        if (parsedUrl.org === scope) {
            if (parsedUrl.subject === 'notes') {
                return <NotePreviewCard className={className} noteId={parsedUrl.id} interactive={interactive}/>;
            }
            else if (parsedUrl.subject === 'posts') {
                return <PostPreviewCard className={className} postId={parsedUrl.id}/>;
            }
            else if (parsedUrl.subject === 'projects') {
                return <ProjectPreviewCard projectId={parsedUrl.id} interactive={interactive}/>;
            }
            else if (parsedUrl.subject === 'calls') {
                return <CallPreviewCard callId={parsedUrl.id} interactive={interactive}/>;
            }
            else if (parsedUrl.subject === 'comment') {
                return <CommentPreviewCard commentId={parsedUrl.id}/>;
            }
        }
    }
    else if (isTwitterUrl(url)) {
        const tweetId = PATH_REGEX.twitter.exec(url.pathname)?.groups?.tweetId;
        if (tweetId) {
            return <TweetPreview className={className} id={tweetId}/>;
        }
    }
    else if (HOST_REGEX.threads.test(url.host)) {
        const result = PATH_REGEX.threads.exec(url.pathname);
        const postId = result?.groups?.postId;
        const username = result?.groups?.username;
        if (postId && username) {
            return <ThreadPreview className={className} postId={postId} username={username}/>;
        }
    }
    else if (HOST_REGEX.youtube.test(url.host)) {
        const videoId = url.searchParams.get('v');
        if (videoId) {
            return <YouTubePreview className={className} videoId={videoId}/>;
        }
    }
    else if (HOST_REGEX.youtubeShort.test(url.host)) {
        const videoId = PATH_REGEX.youtubeShort.exec(url.pathname)?.groups?.videoId;
        if (videoId) {
            return <YouTubePreview className={className} videoId={videoId}/>;
        }
    }
    else if (HOST_REGEX.tella.test(url.host)) {
        const videoId = PATH_REGEX.tella.exec(url.pathname)?.groups?.videoId;
        if (videoId) {
            return <TellaPreview className={className} videoId={videoId}/>;
        }
    }
    else if (HOST_REGEX.loom.test(url.host)) {
        const videoId = PATH_REGEX.loom.exec(url.pathname)?.groups?.videoId;
        if (videoId) {
            return <LoomPreview className={className} videoId={videoId}/>;
        }
    }
    if (display === 'slim') {
        return <SlimOpenGraphCard className={className} url={href}/>;
    }
    return <OpenGraphCard className={className} onForceRemove={onForceRemove} url={href}/>;
}
