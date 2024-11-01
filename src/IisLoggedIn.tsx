import ContentHolder from './components/Contenthouder/ContentHolder';

import Login from './components/Login/Login';
import { useMainContext } from './contexts/useMainContext';

export default function IsLoggedIn() {
    const { isLoggedIn } = useMainContext();
    return <>{isLoggedIn ? <ContentHolder /> : <Login />}</>;
}
