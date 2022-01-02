import { GET_PAGE_PRODUCT } from "../../constants/constants";

const initproductPage = {
    content: [],
};

const myReducer = (state = initproductPage, action) => {
    switch (action.type) {
        case GET_PAGE_PRODUCT:
            return {
                ...state,
                content: action.page.content,
                action,
            };
        default:
            return state;
    }
};

export default myReducer;
