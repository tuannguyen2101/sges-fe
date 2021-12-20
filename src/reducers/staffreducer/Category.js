import {
    UPDATE_CATEGORY,
    GET_ALL_CATEGORY,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
} from "./../../constants/constants";

const initCategory = {
    categories: [],
    last: false,
    first: true,
    totalElements: null,
    totalPages: null,
    number: null,
    size: null,
};

const myReducer = (state = initCategory, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            let data = action.data;
            return {
                ...state,
                categories: data.content,
                first: data.first,
                last: data.last,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                number: data.number,
                size: data.size,
                data,
            };
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: data.content,
                first: data.first,
                last: data.last,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                number: data.number,
                size: data.size,
                data,
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: data.content,
                first: data.first,
                last: data.last,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                number: data.number,
                size: data.size,
                data,
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: data.content,
                first: data.first,
                last: data.last,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                number: data.number,
                size: data.size,
                data,
            };
        default:
            return state;
    }
};

export default myReducer;
