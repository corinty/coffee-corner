import { useRouter } from "next/router";

const OrderComplete = () => {
    const router = useRouter();
    return (
        <>
            <h1>Order Complete</h1>
            <hr />
            <p>Thank you for your order</p>
            <button
                onClick={() => {
                    router.push("/order");
                }}
            >
                Place New Order?
            </button>
        </>
    );
};
export default OrderComplete;
