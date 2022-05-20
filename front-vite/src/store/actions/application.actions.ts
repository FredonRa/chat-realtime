import * as t from '../types';
import { User } from '../../types/application.types';

export const setLoggedIn = () => {
    localStorage.setItem('isLoggedIn', 'true')
    return {
        type: t.SET_IS_LOGGEDIN,
    };
}

export const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
    return {
        type: t.SET_USER,
        payload: user,
    };
};

export const setLogout = () => {
    localStorage.setItem('isLoggedIn', 'false')
    return {
        type: t.SET_LOGOUT,
    }
}