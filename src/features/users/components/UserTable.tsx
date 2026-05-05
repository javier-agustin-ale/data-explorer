import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService.ts';
import { IUser } from '../types/IUser.ts';
import '../styles/user-table.css';
import LoadingSpinner from '../../../shared/features/loading-spinner/components/LoadingSpinner.tsx';

interface UserTableProps {
    handleShowDetailsToggle: (user: IUser) => void;
    userSelected: IUser | null;
}
export default function UserTable({
    handleShowDetailsToggle,
    userSelected,
}: UserTableProps) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getUsers()
            .then((users: IUser[]) => {
                setUsers(users);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
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
                ) : users.length ? (
                    users.map((user) => (
                        <tr
                            key={user.id}
                            onClick={() => handleShowDetailsToggle(user)}
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
    );
}
