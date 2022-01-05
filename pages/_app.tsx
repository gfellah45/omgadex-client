import React from "react";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <div className=" bg-offwhite">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydratedState}>
          <NextNprogress color="#3772FF" />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
