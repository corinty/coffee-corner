import { getMenuMap } from "@db/Menu";
import { getOpenOrders } from "@db/Order";
import type { NextPage, InferGetServerSidePropsType } from "next";

const Fulfillment: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    orders,
    menuMap,
}) => {
    return (
        <>
            <h1>Order Fulfillment</h1>
            <hr />
            <div className="flex flex-wrap gap-4 order-grid">
                {orders.map((order) => {
                    const { done, items } = order;
                    return (
                        <div
                            className="w-1/3 p-4 border-gray-700 border-solid rounded shadow"
                            key={order.id}
                        >
                            <ul className="list-disc">
                                <li>Order ID: {order.id}</li>
                                <li>Customer: {order.user.name}</li>
                                <li>Order Complete: {done.toString()}</li>
                            </ul>
                            <hr />
                            <ul>
                                {items.map(({ itemId, done }) => {
                                    const { name } = menuMap[itemId];
                                    return (
                                        <li key={itemId} className="flex justify-between gap-4">
                                            <p>
                                                <strong>{name}</strong>
                                            </p>{" "}
                                            {!done ? (
                                                <button style={{ background: "var(--secondary)" }}>
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
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    return { props: { orders: await getOpenOrders(), menuMap: await getMenuMap() } };
};

export default Fulfillment;
