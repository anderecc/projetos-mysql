import { APP_SET_LOADED, APP_SET_MENUS } from '../types';

const initialState = {
    menus: [],
    loaded: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_SET_MENUS:
            return { ...state, menus: [...action.payload] };

        case APP_SET_LOADED:
            return { ...state, loaded: action.payload };

        default:
            return { ...state };
    }
};

export default appReducer;
