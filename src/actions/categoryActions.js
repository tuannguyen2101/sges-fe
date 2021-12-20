import * as actionType from "../constants/constants";

export const findAll = (data) => ({
    type: actionType.GET_ALL_CATEGORY,
    data,
});

export const create = (data) => ({
    type: actionType.CREATE_CATEGORY,
    data,
});

export const update = (data) => ({
    type: actionType.UPDATE_CATEGORY,
    data,
});

export const deleteCate = (data) => ({
    type: actionType.DELETE_CATEGORY,
    data,
});
