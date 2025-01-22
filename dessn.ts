export default {
  css: ['packages/ui/src/styles/global.css', 'apps/web/styles/global.css'] as const,
  wrapper: {
    imports: [
      'import { BrowserRouter } from "react-router-dom"',
      'import { QueryClient, QueryClientProvider } from "@tanstack/react-query"'
    ],
    code: `({ children }) => {
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
          <style jsx global>{\`
        :root {
          --font-inter: Inter;
        }
      \`}</style>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </BrowserRouter>
      );
    }`
  }
}
