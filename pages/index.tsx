import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    const router = useRouter();
    return (
        <div>
            <h1>Corner Coffee Home Page</h1>
            <p>Welcome to the coffee shop</p>
            <button
                onClick={() => {
                    router.push("/order");
                }}
            >
                Start Order
            </button>
        </div>
    );
};

export default Home;
