import { APP_SET_LOADED, APP_SET_MENUS } from '../types';

export const appSetMenus = (menus) => (dispatch) =>
    dispatch({ type: APP_SET_MENUS, payload: menus });

export const appSetLoaded = (value) => (dispatch) =>
    dispatch({ type: APP_SET_LOADED, payload: value });
