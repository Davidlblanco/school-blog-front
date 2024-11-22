import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../contexts/useMainContext';
import { User } from '../../typings/projectTypes';
import { apiUrl } from '../../utils/variables';
import { useEffect, useState } from 'react';
import UseDebounce from '../../utils/UseDebounce';
import DataTable from 'react-data-table-component';
import Search from '../Search/Search';
import ModalRemoveItem from '../ModalRemoveItem/ModalRemoveItem';

export default function ListUsers() {
    const navigate = useNavigate();
    const { jwtToken, searchUser, setSearchUser, setOpenModalId } =
        useMainContext();
    const [data, setData] = useState<User[]>([]);

    const getUsers = async () => {
        const users = await fetch(
            `${apiUrl}/users?rows=true${
                searchUser
                    ? `&where={
                            "OR":[
                                {"name":{"contains":"${searchUser}","mode":"insensitive"}},
                                {"email":{"contains":"${searchUser}","mode":"insensitive"}},
                                {"userName":{"contains":"${searchUser}","mode":"insensitive"}}
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
        if (!users.ok) return;
        const userList: User[] = await users.json();
        setData(userList);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const debounceSearch = UseDebounce(() => getUsers(), 1000);
    useEffect(debounceSearch, [searchUser]);

    const handleUpdateClick = (userId: string) => {
        navigate(`/admin/UpdateUser/${userId}`);
    };

    const handleRemoveClick = (userId: string) => {
        setOpenModalId(userId);
    };
    const handleDeleteSuccess = (articleId: string) => {
        setData((prevData) =>
            prevData.filter((article) => article.id !== articleId),
        );
    };

    const columnsToRender = ['name', 'email', 'userName', 'type'];
    const columns = [
        ...(data[0]
            ? columnsToRender.map((item) => ({
                  name: item,
                  selector: (row: any) => row[item],
              }))
            : []),
        {
            name: 'Update',
            cell: (row: User) => (
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
        {
            name: 'Remove',
            cell: (row: User) => (
                <>
                    <button onClick={() => handleRemoveClick(row.id)}>
                        Remove
                    </button>
                    <ModalRemoveItem
                        id={row.id}
                        type={'user'}
                        onDeleteSuccess={() => handleDeleteSuccess(row.id)}
                    />
                </>
            ),
        },
    ];

    const handleCreateClick = () => {
        navigate(`/admin/CreateUser/`);
    };

    function handleRowClick(row: User) {
        navigate(`/admin/UpdateUser/${row.id}`);
    }

    return (
        <>
            <Search value={searchUser} set={setSearchUser} />
            <button onClick={handleCreateClick}>Create</button>
            <DataTable
                columns={columns}
                data={data}
                onRowClicked={handleRowClick}
            />
        </>
    );
}
