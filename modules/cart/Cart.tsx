import { IMenu } from "@modules/menu/@types";
import { useCartStore } from "./hooks/useCartStore";
type Props = {
    menu: IMenu;
};

export default function Cart({ menu }: Props) {
    const [cart, removeItem, clearCart] = useCartStore((store) => [
        store.cart,
        store.remove,
        store.clear,
    ]);
    return (
        <div className="mb-16">
            <h1>Cart</h1>
            <hr />
            <ul>
                {Array.from(cart.values()).map(({ amount, id }) => {
                    const { name } = menu.itemMap[id];
                    return (
                        <li key={id} onClick={() => removeItem(id)}>
                            <p>
                                <span className="font-bold">{name}</span> - Qty: {amount}
                            </p>
                        </li>
                    );
                })}
            </ul>
            <div className="flex gap-4">
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
    );
}
