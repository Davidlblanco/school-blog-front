import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { apiUrl } from '../../utils/variables';
import { useMainContext } from '../../contexts/useMainContext';

interface Row {
    active: boolean;
    content: string;
    creator_id: string;
    date: string;
    file: any;
    filePath: string | null;
    id: string;
    title: string;
}
export default function List() {
    const { jwtToken } = useMainContext();
    const [data, setData] = useState<Row[]>([]);
    const getArticles = async () => {
        const articles = await fetch(`${apiUrl}/articles`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!articles.ok) return;
        const articlesList: Row[] = await articles.json();
        setData(articlesList);
    };
    useEffect(() => {
        getArticles();
    }, []);

    const columns = data[0]
        ? (Object.keys(data[0]) as (keyof Row)[]).map((item) => {
              return { name: item, selector: (row: Row) => row[item] };
          })
        : [];

    return <DataTable columns={columns} data={data} />;
}
