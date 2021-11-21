import type { Item } from "@db/prisma";
import { useState, useEffect } from "react";
import { useCartStore } from "../cart/hooks/useCartStore";
import Counter from "./components/Counter";

type Props = {
    item: Item;
};

export function MenuItem({ item: { id, name, description } }: Props) {
    const add = useCartStore((store) => store.add);
    const isInCart = useCartStore((store) => store.cart.has(id));

    const [isDirty, setisDirty] = useState(false);
    const [amount, setAmount] = useState("1");

    useEffect(() => {
        setisDirty(true);
    }, [amount]);

    return (
        <>
            <div className="flex flex-col w-full">
                <div>
                    <p className={`mb-${description ? "2" : "6"}`}>
                        <span className="text-2xl font-bold">{name}</span>
                        <br />

                        {description && <span className="pl-5 italic">{description}</span>}
                    </p>
                </div>
                <div className="flex flex-wrap-reverse items-center justify-center gap-4 overflow-hidden md:flex-nowrap">
                    <button
                        disabled={amount.length == 0 || (isInCart && !isDirty)}
                        className="w-1/2"
                        onClick={() => {
                            if (amount.length > 0) add(id, parseInt(amount));
                            setisDirty(false);
                        }}
                    >
                        {isInCart && isDirty ? "Update" : "Add"}
                    </button>

                    <Counter value={amount} onChange={setAmount} />
                </div>
            </div>
        </>
    );
}
