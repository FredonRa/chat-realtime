import * as t from '../types';
import { User } from '../../types/application.types';

const initialState: {
    user: User,
    isLoggedIn: boolean
} = { 
    user: {
        email: "",
        role: "",
        username: "",
        _id: ""
    },
    isLoggedIn: false
};

export const applicationReducer = (state = initialState, action: any ) => {
    // if (!action.payload) return state
    switch (action.type) {
        case t.SET_IS_LOGGEDIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case t.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case t.SET_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};