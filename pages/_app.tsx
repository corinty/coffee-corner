import "../styles/globals.css";
import "@shopify/polaris/build/esm/styles.css";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import { AppProvider } from "@shopify/polaris";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppProvider i18n={{}}>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </AppProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
