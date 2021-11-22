import ky from "ky";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { CartList } from "./components/CartList";
import { useCartStore } from "./hooks/useCartStore";

type Props = {};

export default function Cart({}: Props) {
    const { cart, cartMap, clear: clearCart } = useCartStore();
    const router = useRouter();

    const mutation = useMutation(() => ky.post("/api/order/create", { json: cart }), {
        onMutate() {},
        onSuccess() {
            router.push("/order/complete");
            clearCart();
        },
    });
    return (
        <div className="mb-16">
            <h1>Cart</h1>
            <hr />
            <CartList />
            <div className="flex gap-4">
                {!mutation.isLoading && (
                    <button
                        style={{ background: "var(--red)" }}
                        disabled={mutation.isLoading || cartMap.size <= 0}
                        onClick={() => {
                            clearCart();
                        }}
                    >
                        Clear Cart
                    </button>
                )}
                <button
                    disabled={mutation.isLoading}
                    onClick={async () => {
                        mutation.mutate();
                    }}
                >
                    {mutation.isLoading ? "Submitting..." : "Place Order"}
                </button>
            </div>
        </div>
    );
}
