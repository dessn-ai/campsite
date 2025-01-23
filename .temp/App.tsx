import React, { Suspense } from "react";
import { Navigation } from "./Navigation";
import { useRouter } from "./useRouter";
import { ErrorBoundary } from "./ErrorBoundary";
interface AppProps {
  routes: Array<{
    path: string;
    label: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
  }>;
}

export const App: React.FC<AppProps> = ({ routes }) => {
  const { path, navigate } = useRouter();

  const links = routes.map((route) => ({
    path: route.path,
    label: route.label,
  }));

  if (path === "/") {
    return <Navigation navigate={navigate} links={links} />;
  }

  const CurrentComponent = routes.find(
    (route) => route.path === path
  )?.component;

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <ErrorBoundary>
        {CurrentComponent && (
          <div
            ref={() => {
              if (window.parent !== window) {
                window.parent.postMessage(
                  {
                    type: "COMPONENT_LOADED",
                    payload: { path: window.location.pathname },
                  },
                  "*"
                );
              }
            }}
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="component"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CurrentComponent />
            </div>
          </div>
        )}
      </ErrorBoundary>
    </Suspense>
  );
};
