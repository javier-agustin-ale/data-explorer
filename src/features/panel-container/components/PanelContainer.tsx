import { useState } from 'react';
import '../styles/panel-container.css';
import UserTable from '../../users/components/UserTable.tsx';
import UserDetails from '../../users/components/UserDetails.tsx';
import { IUser } from '../../users/types/IUser.ts';

export default function PanelContainer() {
    const [userSelected, setUserSelected] = useState<IUser | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    function handleShowDetailsToggle(user?: IUser): void {
        if (!user) {
            setShowDetails(false);
            setUserSelected(null);
            return;
        }
        setShowDetails(true);
        setUserSelected(user);
    }

    return (
        <>
            <div className="container">
                <div className={showDetails ? 'panel-left' : 'one-panel-only'}>
                    <UserTable
                        handleShowDetailsToggle={(user: IUser) =>
                            handleShowDetailsToggle(user)
                        }
                        userSelected={userSelected}
                    ></UserTable>
                </div>
                {showDetails ? (
                    <div className="panel-right">
                        <UserDetails user={userSelected} />
                    </div>
                ) : null}
            </div>
        </>
    );
}
