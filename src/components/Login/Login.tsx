import { useState, FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import Input from '../Input/Input';
import { apiUrl } from '../../utils/variables';
import { useMainContext } from '../../contexts/useMainContext';
import { JwtPayload } from '../../typings/projectTypes';

export default function Login() {
    const { setJwtToken } = useMainContext();
    const [userName, setUserName] = useState<string>('johndoe');
    const [password, setPassword] = useState<string>('123456');
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setErrorMessage(undefined);
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const login = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                userName,
                password,
            }),
            redirect: 'follow',
        });
        const loginRes = await login.json();
        if (!login.ok) {
            setErrorMessage(loginRes.message);
        }
        const accessToken = loginRes.access_token;
        setJwtToken(accessToken);

        const decoded: JwtPayload = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = decoded.exp - currentTime;

        document.cookie = `school-blog-jwt=${accessToken}; path=/; secure; samesite=strict; max-age=${timeUntilExpiration}`;
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="User name"
                        type="text"
                        set={setUserName}
                        value={userName}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        set={setPassword}
                        value={password}
                        required
                    />
                    <button>Login</button>
                </form>
                {errorMessage ? <p>{errorMessage}</p> : null}
            </div>
        </div>
    );
}
