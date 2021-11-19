import type { NextPage, InferGetServerSidePropsType } from "next";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { getItems } from "@db/Item";
import type { ItemId } from "@db/Item";
import { useMutation } from "react-query";
import ky from "ky";
import { useCartStore } from "@modules/order/hooks/useCartStore";
import { Menu } from "@modules/menu/Menu";
import { IMenu } from "@modules/menu/@types";

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

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ menu }) => {
    const mutation = useMutation(async (itemIds: ItemId[]) =>
        ky.post("/api/order", { json: { itemIds } })
    );

    const [cart, clearCart, removeItem] = useCartStore((store) => [
        store.cart,
        store.clear,
        store.remove,
    ]);

    console.log({ cart, size: cart.size });

    return (
        <div className={styles.container}>
            <h1>Corner Coffee Home Page</h1>
            {false ? (
                <Signin />
            ) : (
                <>
                    <Menu menu={menu} />
                    <div title="Cart">
                        <h1>Cart</h1>
                        <hr />
                        <ul>
                            {Array.from(cart.values()).map(({ amount, id }) => {
                                return (
                                    <li key={id} onClick={() => removeItem(id)}>
                                        {id}: {menu.itemMap[id].name}, Amount: {amount}
                                    </li>
                                );
                            })}
                        </ul>
                        <div style={{ display: "flex", gap: 16 }}>
                            <button
                                style={{ background: "var(--red)" }}
                                disabled={cart.size <= 0}
                                onClick={() => {
                                    clearCart();
                                }}
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={async () => {
                                    // console.log(Object.values(cart));
                                    // const res = await mutation.mutate(cart);
                                    // console.log({ res });
                                }}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const items = await getItems();

    const menu = items.reduce(
        (map, item) => {
            const { id, type } = item;
            if (!map.types[type]) map.types[type] = [];
            map.types[type].push(id);
            map.itemMap[id] = item;

            return map;
        },
        { types: {}, itemMap: {} } as IMenu
    );

    return {
        props: {
            menu,
            session: await getSession(ctx),
        },
    };
};

export default Home;
