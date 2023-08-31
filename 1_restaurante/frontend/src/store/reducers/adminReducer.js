import { ADMIN_SET_USER } from '../types';

const initialState = {
    user: { name: '', email: '' },
};
const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_SET_USER:
            return { ...state, user: { ...action.payload } };

        default:
            return { ...state };
    }
};

export default adminReducer;
