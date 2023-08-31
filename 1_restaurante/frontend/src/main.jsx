import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';

import ImportProvider from './context/importProvider.jsx';
import InitAppProvider from './context/initAppProvider.jsx';
import routes from './routes/routes.jsx';
import './styles/global.sass';
import storeConfig from './store/storeConfig.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={storeConfig}>
            <ImportProvider>
                <InitAppProvider>
                    <RouterProvider router={routes} />
                </InitAppProvider>
            </ImportProvider>
        </Provider>
    </React.StrictMode>
);
