import './packages/ui/src/styles/global.css';
import './apps/web/styles/global.css';
import './apps/web/styles/global.css';
import './packages/ui/src/styles/global.css';
import './packages/ui/src/styles/global.css';
import './apps/web/styles/global.css';
import './apps/web/styles/global.css';
import './packages/ui/src/styles/global.css';
import './packages/ui/src/styles/global.css';
import './apps/web/styles/global.css';
import './packages/ui/src/styles/global.css';
import './apps/web/styles/global.css';
import './apps/web/styles/global.css';
import './packages/ui/src/styles/global.css';
import './packages/ui/src/styles/global.css';
import './apps/web/styles/global.css';
import './apps/web/styles/global.css';
import './packages/ui/src/styles/global.css';
import './apps/web/styles/global.css';
import './packages/ui/src/styles/global.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { routes } from './routes';

// Import any wrapper-specific imports here
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create the wrapper component
const ComponentWrapper = ({ children }) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 30, // 30 minutes
            staleTime: 1000 * 60 * 5 // 5 minutes
          }
        }
      });

      return (
        <BrowserRouter>
          <style jsx global>{`
        :root {
          --font-inter: Inter;
        }
      `}</style>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </BrowserRouter>
      );
    };

ReactDOM.createRoot(document.getElementById('root2')!).render(
  <div>
    <React.StrictMode>
        <ComponentWrapper>
          <App routes={routes} />
        </ComponentWrapper>
    </React.StrictMode>
  </div>
);