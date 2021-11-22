import { getSession } from "next-auth/react";
import { Menu } from "@modules/menu/Menu";
import type { NextPage, InferGetServerSidePropsType } from "next";
import Cart from "@modules/cart/Cart";
import { useMenu } from "@modules/menu/hooks/useMenu";
import { useEffect } from "react";
import { getMenu } from "@db/Menu";

const Order: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    menu,
    session,
}) => {
    const [, setMenu] = useMenu();
    setMenu(menu);

    return (
        <>
            <div>
                <h1>Corner Coffee Home Page</h1>
                <Menu />
                <Cart />
            </div>
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    return {
        props: {
            menu: await getMenu(),
            session: await getSession(ctx),
        },
    };
};

export default Order;
