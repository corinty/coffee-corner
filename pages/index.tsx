import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { Card, Page } from "@shopify/polaris";

export function Signin() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Page title="Corner Coffee Home Page" divider>
                <Card title="Sign In?" sectioned>
                    <Signin />
                </Card>
            </Page>
        </div>
    );
};

export default Home;
