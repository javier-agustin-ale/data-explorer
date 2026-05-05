import { useState, useEffect } from 'react';
import { IPost } from '../types/IPost';
import { getPostsByUserId } from '../services/postService.ts';
import LoadingSpinner from '../../../shared/features/loading-spinner/components/LoadingSpinner.tsx';
import { IUser } from '../types/IUser';
import '../styles/user-details.css';

export default function UserDetails({ user }: { user: IUser | null }) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        getPostsByUserId(user.id)
            .then((res: IPost[]) => setPosts(res))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [user]);

    return (
        <>
            {loading && <LoadingSpinner showLoading={loading} />}
            {!loading && posts.length ? (
                <div className="details-container">
                    <h3>{user?.name}</h3>
                </div>
            ) : null}
        </>
    );
}
