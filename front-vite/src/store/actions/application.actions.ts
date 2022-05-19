import * as t from '../types';
import { User } from '../../types/application.types';

// Get all products from local storage
export const setLoggedIn = () => {
    return {
        type: t.SET_IS_LOGGEDIN,
    };
}

// Receive product for add in the cart
export const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
    return {
        type: t.SET_USER,
        payload: user,
    };
};

// Receive product for remove him in the cart
export const setLogout = () => {
    return {
        type: t.SET_LOGOUT,
    }
}