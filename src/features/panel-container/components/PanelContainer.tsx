import { useState } from 'react';
import '../styles/panel-container.css';
import UserTable from '../../users/components/UserTable.tsx';

export default function PanelContainer() {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    function handleShowDetailsToggle(userId: number): void {
        console.log(userId);
        setShowDetails(!showDetails);
    }

    return (
        <>
            <div className="container">
                <div className="users-table">
                    <UserTable
                        handleShowDetailsToggle={(userId: number) =>
                            handleShowDetailsToggle(userId)
                        }
                    ></UserTable>
                </div>
                {showDetails ? (
                    <div className="user-details">
                        <h1>User Details</h1>
                    </div>
                ) : null}
            </div>
        </>
    );
}
