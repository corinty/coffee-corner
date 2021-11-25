import { getMenuMap } from "@db/Menu";
import { getOpenOrders } from "@db/Order";
import styles from "../styles/Fulfilment.module.scss";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { useQuery, useQueryClient } from "react-query";
import ky from "ky";
import { useFulfillItemMutation } from "@modules/fulfillment/hooks/useFulfillItemMutation";

const Fulfillment: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    initialOrders,
    menuMap,
}) => {
    const queryClient = useQueryClient();
    const { data: orders, isLoading } = useQuery<typeof initialOrders>(
        "openOrders",
        () => ky("/api/order/open").json(),
        {
            initialData: initialOrders,

        }
    );
    const mutation = useFulfillItemMutation();
    if (isLoading || !orders) return <p>Loading...</p>;

    return (
        <>
            <h1>Order Fulfillment</h1>
            <hr />

            <div className={styles.grid}>
                {orders.map((order) => {
                    const { done, items } = order;
                    return (
                        <div
                            className="p-4 border-gray-700 border-solid rounded shadow "
                            key={order.id + "order"}
                        >
                            <ul className="list-disc">
                                <li>Order ID: {order.id}</li>
                                <li>Customer: {order.user.name}</li>
                                <li>Order Complete: {done.toString()}</li>
                            </ul>
                            <hr />
                            <ul>
                                {items.map(({ itemId, done, id }, index) => {
                                    const { name } = menuMap[itemId];
                                    return (
                                        <li key={id} className="flex justify-between gap-4">
                                            <p>
                                                <strong>{name}</strong>
                                            </p>
                                            {!done ? (
                                                <button
                                                    style={{ background: "var(--secondary)" }}
                                                    onClick={() => {
                                                        mutation.mutate(id);
                                                    }}
                                                >
                                                    Done
                                                </button>
                                            ) : (
                                                "Done"
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
                .order-grid {
                    display: ;
                }
            `}</style>
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    return { props: { initialOrders: await getOpenOrders(), menuMap: await getMenuMap() } };
};

export default Fulfillment;
