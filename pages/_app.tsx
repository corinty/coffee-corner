import "tailwindcss/tailwind.css";
import "../node_modules/axist/dist/axist.min.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { enableMapSet } from "immer";

enableMapSet();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
