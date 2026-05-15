import { JSX, useEffect, useState } from 'react';
import { getUsers } from '../services/userService.ts';
import { IUser } from '../interfaces/IUser.ts';
import filterUsers from '../utils/filterUsers.ts';
import '../styles/user-table.css';
import LoadingSpinner from '../../../shared/features/loading-spinner/components/LoadingSpinner.tsx';
import { SortDirection } from '../types/SortDirection.ts';
import { sortData } from '../utils/sortData.ts';
import { TablePagination } from '../../../shared/features/table-pagination/components/TablePagination.tsx';

interface UserTableProps {
    handleShowPostsToggle: (user: IUser) => void;
    userSelected: IUser | null;
}
export default function UserTable({
    handleShowPostsToggle,
    userSelected,
}: UserTableProps) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [sortedColumn, setSortedColumn] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const columnNames: string[] = ['#', 'Name', 'Email', 'User Name', 'Phone'];

    useEffect(() => {
        setLoading(true);
        getUsers()
            .then((users: IUser[]) => {
                setUsers(users);
                setFilteredUsers(users);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const data = filterUsers(searchTerm, users);
        setFilteredUsers(data);
    }, [searchTerm, users]);

    useEffect(() => {
        if (sortedColumn) {
            const sortedData = sortData(
                filteredUsers,
                sortedColumn,
                sortDirection,
            );
            setFilteredUsers(sortedData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortDirection, sortedColumn]);

    const isMatchingField = (fieldValue: string): boolean => {
        if (searchTerm === '') return false;
        return fieldValue
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase());
    };

    const handleColumnClick = (colName: string) => {
        if (sortedColumn === colName) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(colName);
            setSortDirection('asc');
        }
    };
    const getSortIndicator = (colName: string): JSX.Element | null => {
        if (sortedColumn !== colName) return null;
        return sortDirection === 'asc' ? (
            <span className="sort-arrow">▲</span>
        ) : (
            <span className="sort-arrow">▼</span>
        );
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="user-table-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        spellCheck={false}
                    />
                    {searchTerm && (
                        <button
                            className="search-button"
                            onClick={() => setSearchTerm('')}
                        >
                            X
                        </button>
                    )}
                </div>
                <table className="users-table">
                    <thead>
                        <tr>
                            {columnNames.map((colName: string) => (
                                <th
                                    key={colName}
                                    onClick={() => handleColumnClick(colName)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {colName}
                                    {getSortIndicator(colName)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="no-results">
                                    <LoadingSpinner showLoading={loading} />
                                </td>
                            </tr>
                        ) : filteredUsers.length ? (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    onClick={() => handleShowPostsToggle(user)}
                                    className={
                                        userSelected?.id === user.id
                                            ? 'user-selected'
                                            : ''
                                    }
                                >
                                    <td>{user.id}</td>
                                    <td
                                        className={
                                            isMatchingField(user.name)
                                                ? 'highlighted-text'
                                                : ''
                                        }
                                    >
                                        {user.name}
                                    </td>
                                    <td
                                        className={
                                            isMatchingField(user.email)
                                                ? 'highlighted-text'
                                                : ''
                                        }
                                    >
                                        {user.email}
                                    </td>
                                    <td
                                        className={
                                            isMatchingField(user.username)
                                                ? 'highlighted-text'
                                                : ''
                                        }
                                    >
                                        {user.username}
                                    </td>
                                    <td
                                        className={
                                            isMatchingField(user.phone)
                                                ? 'highlighted-text'
                                                : ''
                                        }
                                    >
                                        {user.phone}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="no-results highlighted-text"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <TablePagination
                    totalPages={5}
                    currentPage={currentPage}
                    onPageChange={(page: number) => {
                        handlePageChange(page);
                    }}
                    onRecordsPerPageChange={(recordsPerPage: number) => {
                        console.log(recordsPerPage);
                    }}
                />
            </div>
        </>
    );
}
