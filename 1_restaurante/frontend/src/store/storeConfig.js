import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import adminReducer from './reducers/adminReducer';

const storeConfig = configureStore({
    reducer: {
        app: appReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default storeConfig;
