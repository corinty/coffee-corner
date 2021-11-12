import "../styles/globals.css";
import "@shopify/polaris/build/esm/styles.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { AppProvider } from "@shopify/polaris";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <AppProvider i18n={{}}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </AppProvider>
    );
}

export default MyApp;
