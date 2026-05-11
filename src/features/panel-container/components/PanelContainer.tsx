import { useState } from 'react';
import '../styles/panel-container.css';
import UserTable from '../../users/components/UserTable.tsx';
import { IUser } from '../../users/interfaces/IUser.ts';
import UserPosts from '../../users/components/UserPosts.tsx';

export default function PanelContainer() {
    const [userSelected, setUserSelected] = useState<IUser | null>(null);
    const [showUserPosts, setShowUserPosts] = useState<boolean>(false);

    function handleShowPostsToggle(user?: IUser): void {
        if (!user) {
            setShowUserPosts(false);
            setUserSelected(null);
            return;
        }
        setShowUserPosts(true);
        setUserSelected(user);
    }

    return (
        <>
            <div className="container">
                <div
                    className={showUserPosts ? 'panel-left' : 'one-panel-only'}
                >
                    <UserTable
                        handleShowPostsToggle={(user: IUser) =>
                            handleShowPostsToggle(user)
                        }
                        userSelected={userSelected}
                    ></UserTable>
                </div>
                <div
                    className={`panel-right ${showUserPosts ? 'visible' : 'hidden'}`}
                >
                    <UserPosts
                        user={userSelected}
                        closePanel={() => handleShowPostsToggle()}
                    />
                </div>
            </div>
        </>
    );
}
