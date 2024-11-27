import { useMainContext } from '../../contexts/useMainContext';

export default function Header() {
    const { setJwtToken } = useMainContext();

    function handleLogOut() {
        document.cookie =
            'school-blog-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setJwtToken(undefined);
    }
    return (
        <div>
            <a href="/">Logo</a>
            <button onClick={handleLogOut}>LogOut</button>
            <a href="/myAccount">Minha Conta</a>
        </div>
    );
}
