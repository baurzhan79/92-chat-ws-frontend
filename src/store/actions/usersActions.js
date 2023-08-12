import axios from "../../axiosApi";

import { REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from "../actionTypes";

export const registerUserSuccess = user => {
    return { type: REGISTER_USER_SUCCESS, user };
};

export const registerUserFailure = error => {
    return { type: REGISTER_USER_FAILURE, error };
};

export const registerUser = userData => {
    return async dispatch => {
        try {
            const response = await axios.post("/users", userData);
            dispatch(registerUserSuccess(response.data));
        }
        catch (error) {
            if (error.response && error.response.data) dispatch(registerUserFailure(error.response.data));
            else dispatch(registerUserFailure({ global: "No internet" }));
        }
    };
};

export const loginUserSuccess = user => {
    return { type: LOGIN_USER_SUCCESS, user };
};

export const loginUserFailure = error => {
    return { type: LOGIN_USER_FAILURE, error };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axios.post("/users/sessions", userData);
            dispatch(loginUserSuccess(response.data.user));
        }
        catch (error) {
            if (error.response && error.response.data) dispatch(loginUserFailure(error.response.data));
            else dispatch(loginUserFailure({ global: "No internet" }));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = { "Authorization": token };
        await axios.delete("/users/sessions", { headers });
        dispatch({ type: LOGOUT_USER });
    }
};
