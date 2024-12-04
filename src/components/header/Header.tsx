import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../contexts/useMainContext';

export default function Header() {
    const { setJwtToken, role } = useMainContext();

    const navigate = useNavigate();

    function handleLogOut() {
        document.cookie =
            'school-blog-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setJwtToken(undefined);
    }

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <button onClick={() => navigate('/')} className="text-xl font-bold">
                Blog
            </button>
            <nav className="space-x-4">
                {role === 'ADMIN' ? (
                    <button onClick={() => navigate('/admin/ListUsers')}>
                        Admin
                    </button>
                ) : null}

                <button onClick={() => navigate('/myAccount')}>
                    My account
                </button>
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
