import { GET_CART_ITEM } from "../../constants/constants";

const initCart = [];

const myReducer = (state = initCart, action) => {
    switch (action.type) {
        case GET_CART_ITEM: {
            return action.data;
        }
        default:
            return state;
    }
};

export default myReducer;
