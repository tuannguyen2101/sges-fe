import { SET_AUTH } from "../constants/constants";

export const setAuth = (profile) => {
    return {
        type: SET_AUTH,
        profile,
    };
};
