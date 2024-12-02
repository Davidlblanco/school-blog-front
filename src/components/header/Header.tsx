import { useMainContext } from '../../contexts/useMainContext';

export default function Header() {
    const { setJwtToken, role } = useMainContext();

    function handleLogOut() {
        document.cookie =
            'school-blog-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setJwtToken(undefined);
    }
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold">
                Logo
            </a>
            <nav className="space-x-4">
                {role === 'ADMIN' ? (
                    <a href="/admin/ListUsers" className="hover:underline">
                        Admin
                    </a>
                ) : null}
                <a href="/myAccount" className="hover:underline">
                    My account
                </a>
                <button
                    onClick={handleLogOut}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    LogOut
                </button>
            </nav>
        </header>
    );
}
