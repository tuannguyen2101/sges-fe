import { GET_ALL_PURCHASE } from "../constants/constants";

export const getPagePurchase = (page) => {
    return {
        action: GET_ALL_PURCHASE,
        page,
    };
};
