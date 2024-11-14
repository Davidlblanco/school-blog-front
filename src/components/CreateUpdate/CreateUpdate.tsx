import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { useMainContext } from '../../contexts/useMainContext';
import { apiUrl } from '../../utils/variables';
import { Article } from '../../typings/projectTypes';

export default function CreateUpdate() {
    const [active, setActive] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type="checkbox"
                    label="status"
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
                    label="conteúdo"
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
                <button>Enviar</button>
            </form>
        </>
    );
}

// interface InputProps {
//     label: string;
//     type: string;
//     value: any;
//     set: React.Dispatch<React.SetStateAction<any>>;

// export interface Article {
//     active: boolean;
//     content: string;
//     creator_id: string;
//     date: string;
//     file: any;
//     filePath: string | null;
//     id: string;
//     title: string;
//     creator: { name: string };
// }
