import { GET_PAGE_PRODUCT } from "../../constants/constants";

const initproductPage = {
    content: [],
    last: false,
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    first: true,
};

const myReducer = (state = initproductPage, action) => {
    switch (action.type) {
        case GET_PAGE_PRODUCT:
            return {
                ...state,
                content: action.page.content,
                last: action.page.last,
                totalElements: action.page.totalElements,
                totalPages: action.page.totalPages,
                size: action.page.size,
                number: action.page.number,
                first: action.page.first,
                action,
            };
        default:
            return state;
    }
};

export default myReducer;
