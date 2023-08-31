import { createBrowserRouter } from 'react-router-dom';
import Contact from '../pages/contact';
import Menu from '../pages/menu';
import Reservation from '../pages/reservation';
import Services from '../pages/services';
import HomeAdmin from '../pages/admin';
import PrivateRoute from './PrivateRoute';
import AdminEmails from '../pages/admin/emails';
import AdminLogin from '../pages/admin/login';
import AdminMenus from '../pages/admin/menus';
import AdminReservations from '../pages/admin/reservations';
import AdminUsers from '../pages/admin/users';
import AdminContacts from '../pages/admin/contacts';
import PageHome from '../pages/home';

const routes = createBrowserRouter([
    { path: '/', element: <PageHome /> },
    { path: '/contact', element: <Contact /> },
    { path: '/menu', element: <Menu /> },
    { path: '/reservation', element: <Reservation /> },
    { path: '/services', element: <Services /> },
    {
        path: '/admin/login',
        element: <AdminLogin />,
    },
    {
        path: '/admin',
        element: (
            <PrivateRoute>
                <HomeAdmin />
            </PrivateRoute>
        ),
    },
    {
        path: '/admin/contacts',
        element: (
            <PrivateRoute>
                <AdminContacts />
            </PrivateRoute>
        ),
    },
    {
        path: '/admin/emails',
        element: (
            <PrivateRoute>
                <AdminEmails />
            </PrivateRoute>
        ),
    },

    {
        path: '/admin/menus',
        element: (
            <PrivateRoute>
                <AdminMenus />
            </PrivateRoute>
        ),
    },
    {
        path: '/admin/reservations',
        element: (
            <PrivateRoute>
                <AdminReservations />
            </PrivateRoute>
        ),
    },
    {
        path: '/admin/users',
        element: (
            <PrivateRoute>
                <AdminUsers />
            </PrivateRoute>
        ),
    },
]);

export default routes;
