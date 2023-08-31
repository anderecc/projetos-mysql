/* eslint-disable no-unused-vars */
import { createContext, useEffect } from 'react';

const ImportContext = createContext();

const ImportProvider = ({ children }) => {
    useEffect(() => {
        const _1 = './js/jquery.min.js';
        const _2 = './js/jquery.easing.1.3.js';
        const _3 = './js/bootstrap.min.js';
        const _4 = './js/jquery.waypoints.min.js';
        const _5 = './js/owl.carousel.min.js';
        const _6 = './js/jquery.countTo.js';
        const _7 = './js/jquery.stellar.min.js';
        const _8 = './js/jquery.magnific-popup.min.js';
        const _9 = './js/magnific-popup-options.js';
        const _10 = './js/moment.min.js';
        const _11 = './js/bootstrap-datetimepicker.min.js';
        const _12 = './js/adminlte.js';
        const _13 = './js/adminlte.min.js';
        const _14 = './js/dashboard.js';
        const _15 = './js/dashboard2.js';
        const _16 = './js/demo.js';
        const _17 = './js/main.js';
    }, []);

    return (
        <ImportContext.Provider value={{ undefined }}>
            {children}
        </ImportContext.Provider>
    );
};

export default ImportProvider;
