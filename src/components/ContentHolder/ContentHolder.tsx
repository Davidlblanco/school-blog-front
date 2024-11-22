import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import List from '../List/List';
import View from '../View/View';
import CreateUpdate from '../CreateUpdate/CreateUpdate';
import Toast from '../../utils/Toast';
import Header from '../header/Header';
import ListUsers from '../ListUsers/ListUsers';
import CreateUpdateUser from '../CreateUser/CreateUpdateUser';
const router = createBrowserRouter([
    {
        path: '/',
        element: <List />,
    },
    {
        path: '/:id',
        element: <View />,
    },
    {
        path: '/createArticle',
        element: <CreateUpdate />,
    },
    {
        path: '/updateArticle/:id',
        element: <CreateUpdate />,
    },
    {
        path: '/admin/ListUsers',
        element: <ListUsers />,
    },
    {
        path: '/admin/UpdateUser/:id',
        element: <CreateUpdateUser />,
    },
    {
        path: '/admin/CreateUser',
        element: <CreateUpdateUser />,
    },
]);
export default function ContentHolder() {
    return (
        <>
            <Header />
            <RouterProvider router={router}></RouterProvider>
            <Toast />
        </>
    );
}
