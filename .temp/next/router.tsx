import { useCallback } from "react";

interface RouterInstance {
  push: (url: string) => Promise<boolean>;
  replace: (url: string) => Promise<boolean>;
  prefetch: (url: string) => Promise<void>;
  back: () => void;
  reload: () => void;
  pathname: string;
  query: Record<string, string | string[]>;
  asPath: string;
  events: {
    on: (event: string, callback: (...args: any[]) => void) => void;
    off: (event: string, callback: (...args: any[]) => void) => void;
  };
  isReady: boolean;
  isFallback: boolean;
  isPreview: boolean;
  basePath: string;
  locale: string;
  locales: string[];
  defaultLocale: string;
  domainLocales?: Array<{
    domain: string;
    defaultLocale: string;
    locales?: string[];
  }>;
}

// Stub router instance
const router: RouterInstance = {
  push: (url) => Promise.resolve(true),
  replace: (url) => Promise.resolve(true),
  prefetch: (url) => Promise.resolve(),
  back: () => {},
  reload: () => {},
  pathname: "/",
  query: {},
  asPath: "/",
  events: {
    on: () => {},
    off: () => {},
  },
  isReady: true,
  isFallback: false,
  isPreview: false,
  basePath: "",
  locale: "en",
  locales: ["en"],
  defaultLocale: "en",
  domainLocales: [],
};

export function useRouter(): RouterInstance {
  return router;
}

export const Router = {
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  push: (url: string) => Promise.resolve(true),
  replace: (url: string) => Promise.resolve(true),
  reload: () => {},
  back: () => {},
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  ready: () => Promise.resolve(true),
};

export default router;
