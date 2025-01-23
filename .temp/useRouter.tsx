import { useState, useEffect } from "react";

export const useRouter = () => {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (to: string) => {
    // Update local state
    setPath(to);

    // Notify parent about navigation
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "ROUTER_UPDATE",
          payload: { path: to },
        },
        "*"
      );
    }

    // Update URL without reload
    window.history.pushState({}, "", to);
  };

  useEffect(() => {
    const handlePathChange = () => {
      setPath(window.location.pathname);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "ROUTER_UPDATE") {
        const newPath = event.data.payload.path;
        navigate(newPath);
      }
    };

    // Notify parent that router is loaded and ready
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "ROUTER_LOADED",
          payload: { path: window.location.pathname },
        },
        "*"
      );
    }

    window.addEventListener("popstate", handlePathChange);
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("popstate", handlePathChange);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return { path, navigate };
};
