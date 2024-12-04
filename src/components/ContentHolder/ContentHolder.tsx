import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import List from '../List/List';
import View from '../View/View';
import CreateUpdate from '../CreateUpdate/CreateUpdate';
import Toast from '../../utils/Toast';
import Header from '../header/Header';
import ListUsers from '../ListUsers/ListUsers';
import CreateUpdateUser from '../CreateUser/CreateUpdateUser';
import MyAccount from '../MyAccount/MyAccount';
const router = createBrowserRouter([
    {
        path: '/',
        element: insertHeader(<List />),
    },
    {
        path: '/:id',
        element: insertHeader(<View />),
    },
    {
        path: '/createArticle',
        element: insertHeader(<CreateUpdate />),
    },
    {
        path: '/updateArticle/:id',
        element: insertHeader(<CreateUpdate />),
    },
    {
        path: '/admin/ListUsers',
        element: insertHeader(<ListUsers />),
    },
    {
        path: '/admin/UpdateUser/:id',
        element: insertHeader(<CreateUpdateUser />),
    },
    {
        path: '/admin/CreateUser',
        element: insertHeader(<CreateUpdateUser />),
    },
    {
        path: '/myAccount',
        element: insertHeader(<MyAccount />),
    },
]);
function insertHeader(element: React.ReactNode) {
    return (
        <>
            <Header />
            {element}
        </>
    );
}
export default function ContentHolder() {
    return (
        <>
            <RouterProvider router={router} />
            <Toast />
        </>
    );
}
