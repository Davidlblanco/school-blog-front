import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { useMainContext } from '../../contexts/useMainContext';
import { apiUrl } from '../../utils/variables';
import { User, UserType } from '../../typings/projectTypes';
import AccessDenied from '../AccessDenied/AccessDenied';

export default function CreateUpdateUser() {
    const [active, setActive] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [type, setType] = useState<UserType>('STUDENT');
    const { jwtToken, setContextError, setContextSuccess, role } =
        useMainContext();
    const { id } = useParams();
    const navigate = useNavigate();

    function createHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${jwtToken}`);
        return headers;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const payload: Partial<User> = {
            active,
            name,
            email,
            userName,
            type,
        };
        if (!id) {
            payload.password = 'Ch@ngeMe1';
        }
        const createUpdateUser = await fetch(
            `${apiUrl}/users${id ? `/${id}` : ''}`,
            {
                method: id ? 'PATCH' : 'POST',
                headers: createHeaders(),
                body: JSON.stringify(payload),
                redirect: 'follow',
            },
        );
        const user: User = await createUpdateUser.json();
        if (!createUpdateUser.ok) {
            console.error('ERROR:', user);
            setContextError(`Erro ao ${id ? 'atualizar' : 'criar'} usuário!`);
            return;
        }
        setContextSuccess(`User ${id ? 'updated' : 'created'}!`);
        navigate('/');
    }

    async function setInitialParameters() {
        const getUser = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
            headers: createHeaders(),
            redirect: 'follow',
        });
        const user: User = await getUser.json();
        if (!getUser.ok) {
            console.error('ERROR:', user);
            setContextError(`Error trying to find user, id: ${id}`);
            return;
        }
        setActive(user.active);
        setName(user.name);
        setEmail(user.email);
        setUserName(user.userName);
        setType(user.type);
    }

    useEffect(() => {
        if (!id) return;
        setInitialParameters();
    }, [id]);

    if (role !== 'ADMIN') return <AccessDenied />;
    return (
        <div className="p-4 bg-white rounded shadow-md  m-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="checkbox"
                    label="Status"
                    value={active}
                    set={setActive}
                />
                <Input
                    type="text"
                    label="Name"
                    value={name}
                    set={setName}
                    required
                />
                <Input
                    type="email"
                    label="Email"
                    value={email}
                    set={setEmail}
                    required
                />
                <Input
                    type="text"
                    label="User name"
                    value={userName}
                    set={setUserName}
                    required
                />
                <label className="block mb-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                        Type
                    </p>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as UserType)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </label>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
