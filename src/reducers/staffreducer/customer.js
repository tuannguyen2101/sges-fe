import { CREATE_CUSTOMER, GET_ALL_CUSTOMER, UPDATE_CUSTOMER } from "../../constants/constants";

const initCustomer = {
    customers: [],
    page: {
        last: false,
        first: true,
        totalElements: null,
        totalPages: null,
        number: null,
        size: null,
    },
    customer: {
        id: null,
        code: null,
        avartar: null,
        contact: {
            fullname: null,
            age: null,
            gender: null,
            email: null,
            address: null,
            phone: null,
        },
        purchase: {
            products: [],
            total: null,
            orderStatus: null,
        },
        class: null,
    },
};

const myReducer = (state = initCustomer, action) => {
    switch (action.type) {
        case GET_ALL_CUSTOMER:
            return {
                ...state,
                action,
            };
        case CREATE_CUSTOMER:
            return {
                ...state,
                action,
            };
        case UPDATE_CUSTOMER:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default myReducer;
