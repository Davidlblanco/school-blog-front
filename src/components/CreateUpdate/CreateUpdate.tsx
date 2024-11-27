import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { useMainContext } from '../../contexts/useMainContext';
import { apiUrl } from '../../utils/variables';
import { Article } from '../../typings/projectTypes';
import AccessDenied from '../AccessDenied/AccessDenied';

export default function CreateUpdate() {
    const [active, setActive] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { jwtToken, setContextError, setContextSuccess, role } =
        useMainContext();
    const { id } = useParams();

    function createHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${jwtToken}`);
        return headers;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const payload = {
            active,
            content,
            title,
            filePath: imageUrl,
        };

        const createUpdateArticle = await fetch(
            `${apiUrl}/articles${id ? `/${id}` : ''}`,
            {
                method: id ? 'PATCH' : 'POST',
                headers: createHeaders(),
                body: JSON.stringify(payload),
                redirect: 'follow',
            },
        );
        const article: Article = await createUpdateArticle.json();
        if (!createUpdateArticle.ok) {
            console.error('ERROR:', article);
            setContextError(`Erro ao ${id ? 'atualizar' : 'criar'} artigo!`);
            return;
        }
        setContextSuccess(`Artigo ${id ? 'atualizado' : 'criado'}!`);
    }

    async function setInitialParameters() {
        const getArticle = await fetch(`${apiUrl}/articles/${id}`, {
            method: 'GET',
            headers: createHeaders(),
            redirect: 'follow',
        });
        const article: Article = await getArticle.json();
        if (!getArticle.ok) {
            console.error('ERROR:', article);
            setContextError(
                `Erro ao procurar o artigo a ser editado, id: ${id}`,
            );
            return;
        }
        setActive(article.active);
        setTitle(article.title);
        setContent(article.content);
        if (article.filePath) setImageUrl(article.filePath);
    }

    useEffect(() => {
        if (!id) return;
        setInitialParameters();
    }, []);

    if (role !== 'ADMIN' && role !== 'TEACHER') return <AccessDenied />;
    return (
        <div className="p-4 bg-white rounded shadow-md m-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="checkbox"
                    label="Status"
                    value={active}
                    set={setActive}
                />
                <Input
                    type="text"
                    label="Título"
                    value={title}
                    set={setTitle}
                    required
                />
                <Input
                    type="textarea"
                    label="Conteúdo"
                    value={content}
                    set={setContent}
                    required
                />
                <Input
                    type="text"
                    label="Link de imagem"
                    value={imageUrl}
                    set={setImageUrl}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
