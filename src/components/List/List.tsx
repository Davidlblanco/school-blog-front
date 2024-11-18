import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { apiUrl } from '../../utils/variables';
import { useMainContext } from '../../contexts/useMainContext';
import { Article } from '../../typings/projectTypes';
import { useNavigate } from 'react-router-dom';

export default function List() {
    const navigate = useNavigate();
    const { jwtToken } = useMainContext();
    const [data, setData] = useState<Article[]>([]);
    const getArticles = async () => {
        const articles = await fetch(`${apiUrl}/articles?rows=true`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!articles.ok) return;
        const articlesList: Article[] = await articles.json();
        setData(articlesList);
    };
    useEffect(() => {
        getArticles();
    }, []);

    const handleUpdateClick = (articleId: string) => {
        navigate(`/updateArticle/${articleId}`);
    };

    const columns = [
        ...(data[0]
            ? (Object.keys(data[0]) as (keyof Article)[]).map((item) => ({
                  name: item,
                  selector: (row: Article) => JSON.stringify(row[item]),
              }))
            : []),
        {
            name: 'Actions',
            cell: (row: Article) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClick(row.id);
                    }}
                >
                    Update
                </button>
            ),
        },
    ];
    const handleCreateClick = () => {
        navigate(`/createArticle/`);
    };
    function handleRowClick(row: Article) {
        navigate(`/${row.id}`);
    }
    return (
        <>
            <button onClick={handleCreateClick}>create</button>
            <DataTable
                columns={columns}
                data={data}
                onRowClicked={handleRowClick}
            />
        </>
    );
}
