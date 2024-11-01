import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../utils/variables';
import { useMainContext } from '../../contexts/useMainContext';
import { Article } from '../../typings/projectTypes';

export default function View() {
    const { id } = useParams();
    const { jwtToken } = useMainContext();
    const [article, setArticle] = useState<Article>();
    const getArticle = async () => {
        const articles = await fetch(`${apiUrl}/articles/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!articles.ok) return;
        const article: Article = await articles.json();
        setArticle(article);
    };
    useEffect(() => {
        getArticle();
    }, []);

    return <pre>{JSON.stringify(article)}</pre>;
}
