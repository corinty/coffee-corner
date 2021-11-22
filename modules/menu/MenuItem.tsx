import type { Item } from "@db/prisma";
import { useInCart } from "@modules/cart/hooks/useInCart";
import { useState, useEffect } from "react";
import { useCartStore } from "../cart/hooks/useCartStore";
import Counter from "./components/Counter";

type Props = {
    item: Item;
};

export function MenuItem({ item: { id, name, description } }: Props) {
    const { add, cartMap } = useCartStore();
    const isInCart = cartMap.has(id);

    const [isDirty, setisDirty] = useState(false);
    const [quantity, setQuantity] = useState("1");

    useEffect(() => {
        setisDirty(true);
    }, [quantity]);

    const buttonText = () => {
        if (!isInCart) return "Add";
        if (!isDirty) return "In Cart";
        if (isDirty) return "Update Cart";
    };

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
                        disabled={quantity.length == 0 || (isInCart && !isDirty)}
                        className="w-1/2"
                        onClick={() => {
                            if (quantity.length > 0) add(id, parseInt(quantity));
                            setisDirty(false);
                        }}
                    >
                        {buttonText()}
                    </button>

                    <Counter value={quantity} onChange={setQuantity} />
                </div>
            </div>
        </>
    );
}
