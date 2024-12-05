import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../contexts/useMainContext';
import { User } from '../../typings/projectTypes';
import { apiUrl } from '../../utils/variables';
import { useEffect, useState } from 'react';
import UseDebounce from '../../utils/UseDebounce';
import DataTable from 'react-data-table-component';
import Search from '../Search/Search';
import ModalRemoveItem from '../ModalRemoveItem/ModalRemoveItem';
import AccessDenied from '../AccessDenied/AccessDenied';
import { check, unCheck } from '../../utils/Icons';

export default function ListUsers() {
    const navigate = useNavigate();
    const { jwtToken, searchUser, setSearchUser, setOpenModalId, role } =
        useMainContext();
    const [data, setData] = useState<User[]>([]);

    const getUsers = async () => {
        const orderByFilter = `&orderBy={"name":"asc"}`;
        const users = await fetch(
            `${apiUrl}/users?rows=true${orderByFilter}${
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

    const columnsToRender = ['active', 'name', 'email', 'userName', 'type'];
    const columns = [
        ...(data[0]
            ? columnsToRender.map((item) => ({
                  name: item.charAt(0).toUpperCase() + item.slice(1),
                  selector: (row: any) =>
                      item === 'active'
                          ? row[item]
                              ? check
                              : unCheck
                          : row[item],
                  width: item === 'active' ? '70px' : '200px',
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
                    className="text-blue-500 hover:underline"
                >
                    Update
                </button>
            ),
        },
        {
            name: 'Remove',
            cell: (row: User) => (
                <>
                    <button
                        onClick={() => handleRemoveClick(row.id)}
                        className="text-red-500 hover:underline"
                    >
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
    if (role !== 'ADMIN') return <AccessDenied />;
    return (
        <div className="p-4">
            <div className="flex">
                <Search value={searchUser} set={setSearchUser} />
                <button
                    onClick={handleCreateClick}
                    className="ml-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Create
                </button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                onRowClicked={handleRowClick}
                className="bg-white shadow-md rounded"
                conditionalRowStyles={[
                    {
                        when: (row) => row.active,
                        style: {
                            backgroundColor: 'white',
                        },
                    },
                    {
                        when: (row) => !row.active,
                        style: {
                            backgroundColor: '#f0f0f0',
                        },
                    },
                ]}
            />
        </div>
    );
}
