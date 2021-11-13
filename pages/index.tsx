import { useState } from "react";
import type { NextPage, InferGetServerSidePropsType } from "next";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Card, Page } from "@shopify/polaris";
import { getItems } from "@db/Item";
import { Item } from "@db/prisma";
import { useMutation } from "react-query";
import ky from "ky";

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

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ menuItems }) => {
    const [cart, setCart] = useState<{ [key: number]: Item }>({});
    const { data: session } = useSession();

    const mutation = useMutation(async (items: Item[]) =>
        ky.post("/api/order", { json: { items } })
    );

    const addToCart = (item: Item) => {
        setCart((curCart) => ({ ...curCart, [item.id]: item }));
    };
    const removeFromCart = (item: Item) => {
        setCart((curCart) => {
            delete curCart[item.id];
            return { ...curCart };
        });
    };
    return (
        <div className={styles.container}>
            <Page title="Corner Coffee Home Page" divider>
                {!session ? (
                    <Card title="Sign In?" sectioned>
                        <Signin />
                    </Card>
                ) : (
                    <>
                        <Card title="Menu" sectioned>
                            <ul>
                                {menuItems.map((item) => {
                                    const { name, description, type, id } = item;
                                    return (
                                        <li
                                            key={name}
                                            style={{ padding: "10px" }}
                                            onClick={() => {
                                                if (cart[id]) {
                                                    removeFromCart(item);
                                                } else {
                                                    addToCart(item);
                                                }
                                            }}
                                        >
                                            <p>
                                                {name}: {type}
                                            </p>
                                            <p>{description}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card>
                        <Card sectioned title="Cart">
                            <ul>
                                {Object.values(cart).map((item) => {
                                    return <li key={item.id}>{item.name}</li>;
                                })}
                            </ul>
                            <div style={{ display: "flex", gap: 16 }}>
                                <Button destructive onClick={() => setCart({})}>
                                    Clear Cart
                                </Button>
                                <Button
                                    onClick={async () => {
                                        console.log(Object.values(cart));

                                        const res = await mutation.mutate(Object.values(cart));
                                        console.log({ res });
                                    }}
                                >
                                    Place Order
                                </Button>
                            </div>
                        </Card>
                    </>
                )}
            </Page>
        </div>
    );
};

export const getServerSideProps = async () => {
    const menuItems = await getItems();

    return {
        props: {
            menuItems,
        },
    };
};

export default Home;
