import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { useMainContext } from '../../contexts/useMainContext';
import { apiUrl } from '../../utils/variables';
import { User, UserType } from '../../typings/projectTypes';

export default function CreateUpdateUser() {
    const [active, setActive] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [type, setType] = useState<UserType>('STUDENT');
    const { jwtToken, setContextError, setContextSuccess } = useMainContext();
    const { id } = useParams();

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
        setContextSuccess(`Usuário ${id ? 'atualizado' : 'criado'}!`);
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
            setContextError(
                `Erro ao procurar o usuário a ser editado, id: ${id}`,
            );
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type="checkbox"
                    label="Status"
                    value={active}
                    set={setActive}
                />
                <Input
                    type="text"
                    label="Nome"
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
                    label="Nome de usuário"
                    value={userName}
                    set={setUserName}
                    required
                />
                <label>
                    <p>Tipo</p>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as UserType)}
                        required
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </label>
                <button>Enviar</button>
            </form>
        </>
    );
}
