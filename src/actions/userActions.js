import UserService from "../services/user.service";
import { ERROR_ACTION, FETCH_USER, FETCH_USERS, UPDATE_USER } from "./types";

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { clients, error } = await UserService.fetchUsers();
        if (error) {
            dispatch({
                type: ERROR_ACTION,
                payload: error.message,
            });
            return Promise.reject(error);
        } else {
            dispatch({
                type: FETCH_USERS,
                payload: { users: clients },
            });
            return Promise.resolve(clients);
        }
    } catch (err) {
        return Promise.reject(err);
    }
};


export const fetchUser = (userId) => async (dispatch) => {
    try {
        const { data, error } = await UserService.fetchUser(userId);
        if (error) {
            dispatch({
                type: ERROR_ACTION,
                payload: error.message,
            });
            return Promise.resolve(error);
        } else {
            dispatch({
                type: FETCH_USER,
                payload: data,
            });
            return Promise.resolve(data);
        }
    } catch (err) {
        return Promise.reject(err);
    }
}


export const updateUserAction = (client) => async (dispatch) => {
    try {
        const { data, error } = await UserService.updateUser(client);
        if (error) {
            dispatch({
              type: ERROR_ACTION,
              payload: error.message,
            });
            return Promise.resolve(error);
        } else {
            dispatch({
              type: UPDATE_USER,
              payload: { user: data },
            });
            return Promise.resolve(data);
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

