import { useMenu } from "@modules/menu/hooks/useMenu";
import { useCartStore } from "../hooks/useCartStore";

export function CartList() {
    const { cart } = useCartStore();
    const [{ itemMap }] = useMenu();

    return (
        <>
            <ul>
                {cart.map(({ quantity, itemId }) => {
                    const { name } = itemMap[itemId];
                    return (
                        <li key={itemId} className={"flex gap-4"}>
                            <p className="m-0">
                                <span className="font-bold">{name}</span> - Qty: {quantity}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
