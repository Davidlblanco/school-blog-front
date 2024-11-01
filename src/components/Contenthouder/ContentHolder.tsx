import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import List from '../List/List';
import View from '../View/View';
const router = createBrowserRouter([
    {
        path: '/',
        element: <List />,
    },
    {
        path: '/:id',
        element: <View />,
    },
]);
export default function ContentHolder() {
    return <RouterProvider router={router} />;
}
