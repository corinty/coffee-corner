import type { OrderItemId } from "@db/OrderItem";
import { useMutation, useQueryClient } from "react-query";
import ky from "ky";

export const useFulfillItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((id: OrderItemId) => ky.post(`/api/fulfill/item/${id}`).json(), {
        onSuccess() {
            queryClient.invalidateQueries("openOrders");
        },
    });
};
