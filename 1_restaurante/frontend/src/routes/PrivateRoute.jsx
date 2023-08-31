import { useEffect, useState } from 'react';
import { verifyLogin } from '../functions/admin';
import redirect from '../utils/redirect';
import { useDispatch } from 'react-redux';
import { adminSetUser } from '../store/actions/adminActions';

const PrivateRoute = ({ children }) => {
    const [admin, setAdmin] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        verifyLogin()
            .then((res) => {
                dispatch(adminSetUser(res));
                return setAdmin(true);
            })
            .catch(() => {
                setAdmin(false);
                return redirect('/admin/login');
            });
    }, []);

    return <>{admin ? children : <div />}</>;
};

export default PrivateRoute;
