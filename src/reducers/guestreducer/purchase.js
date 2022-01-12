import { GET_ALL_PURCHASE } from "../../constants/constants";

const initpurchase = null;

const myReducer = (state = initpurchase, action) => {
    switch (action.type) {
        case GET_ALL_PURCHASE:
            return action.page;
        default:
            return state;
    }
};

export default myReducer;
