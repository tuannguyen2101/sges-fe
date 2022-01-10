import { GET_CART_ITEM } from "../constants/constants";

export const setCartItem = (data) => {
    return {
        type: GET_CART_ITEM,
        data,
    };
};
