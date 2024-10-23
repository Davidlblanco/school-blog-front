import List from './components/List/List';
import Login from './components/Login/Login';
import { useMainContext } from './contexts/useMainContext';

export default function IsLoggedIn() {
    const { isLoggedIn } = useMainContext();
    return <>{isLoggedIn ? <List /> : <Login />}</>;
}
