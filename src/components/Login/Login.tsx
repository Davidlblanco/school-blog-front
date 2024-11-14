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
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Usuário"
                    type="text"
                    set={setUserName}
                    value={userName}
                    required
                />
                <Input
                    label="Senha"
                    type="text"
                    set={setPassword}
                    value={password}
                    required
                />
                <button>Login</button>
            </form>
            {errorMessage ? <p>{errorMessage}</p> : null}
        </>
    );
}
