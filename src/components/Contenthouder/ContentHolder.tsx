import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import List from '../List/List';
import View from '../View/View';
import CreateUpdate from '../CreateUpdate/CreateUpdate';
import Toast from '../../utils/Toast';
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
]);
export default function ContentHolder() {
    return (
        <>
            <RouterProvider router={router} />
            <Toast />
        </>
    );
}
