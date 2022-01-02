import * as actionType from "../constants/constants";

export const findAll = (page) => ({
    type: actionType.GET_PAGE_PRODUCT,
    page,
});
