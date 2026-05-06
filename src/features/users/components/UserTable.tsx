import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService.ts';
import { IUser } from '../types/IUser.ts';
import filterUsers from '../utils/filterUsers.ts';
import '../styles/user-table.css';
import LoadingSpinner from '../../../shared/features/loading-spinner/components/LoadingSpinner.tsx';

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
        console.log(data);
    }, [searchTerm, users]);

    return (
        <>
            <input
                type="text"
                placeholder="Filter by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="users-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Name</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td
                                colSpan={5}
                                style={{
                                    textAlign: 'center',
                                    padding: '60px 15px',
                                }}
                            >
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
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))
                    ) : null}
                </tbody>
            </table>
        </>
    );
}
