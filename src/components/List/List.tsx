import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { apiUrl } from '../../utils/variables';
import { useMainContext } from '../../contexts/useMainContext';
import { Article } from '../../typings/projectTypes';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import UseDebounce from '../../utils/UseDebounce';

export default function List() {
    const navigate = useNavigate();
    const { jwtToken, search } = useMainContext();
    const [data, setData] = useState<Article[]>([]);
    const getArticles = async () => {
        const articles = await fetch(
            `${apiUrl}/articles?rows=true${
                search
                    ? `&where={
                            "OR":[
                                {"title":{"contains":"${search}","mode":"insensitive"}},
                                {"content":{"contains":"${search}","mode":"insensitive"}},
                                {"creator":{"name":{"contains":"${search}","mode":"insensitive"}}}
                            ]
                        }`
                    : ''
            }`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        if (!articles.ok) return;
        const articlesList: Article[] = await articles.json();
        setData(articlesList);
    };
    useEffect(() => {
        getArticles();
    }, []);

    const debounceSearch = UseDebounce(() => getArticles(), 1000);
    useEffect(() => {
        debounceSearch();
    }, [search]);

    const handleUpdateClick = (articleId: string) => {
        navigate(`/updateArticle/${articleId}`);
    };
    const columnsToRender = ['title', 'content'];
    const columns = [
        ...(data[0]
            ? columnsToRender.map((item) => ({
                  name: item,
                  selector: (row: any) => row[item],
              }))
            : []),
        {
            name: 'name',
            selector: (row: Article) => row['creator'].name,
        },
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
            <Search />
            <button onClick={handleCreateClick}>create</button>
            <DataTable
                columns={columns}
                data={data}
                onRowClicked={handleRowClick}
            />
        </>
    );
}
