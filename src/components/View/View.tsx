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
    if (!article) return;
    return (
        <div className="p-4 pt-12 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="mb-4 flex">
                {article.filePath ? (
                    <img
                        src={article.filePath}
                        alt={article.title}
                        className="rounded mr-4"
                    />
                ) : null}
                <p className="text-gray-700">{article.content}</p>
            </div>
            <p className="text-gray-500">By {article.creator.name}</p>
            <p className="text-gray-500">{article.date.split('T')[0]}</p>
        </div>
    );
}
