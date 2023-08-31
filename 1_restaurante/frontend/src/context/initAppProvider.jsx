import { createContext, useEffect } from 'react';
import { getMenus } from '../functions/app';
import { useDispatch } from 'react-redux';
import { appSetLoaded, appSetMenus } from '../store/actions/appActions';

const InitAppContext = createContext();

const InitAppProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getMenus()
            .then((res) => {
                dispatch(appSetMenus(res));
                dispatch(appSetLoaded(true));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <InitAppContext.Provider value={{ undefined }}>
            {children}
        </InitAppContext.Provider>
    );
};

export default InitAppProvider;
