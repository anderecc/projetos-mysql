import { ADMIN_SET_USER } from '../types';

export const adminSetUser = (user) => (dispatch) =>
    dispatch({ type: ADMIN_SET_USER, payload: user });
