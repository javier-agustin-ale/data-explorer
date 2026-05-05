import { useState, useEffect } from 'react';
import { IPost } from '../types/IPost.ts';
import { getPostsByUserId } from '../services/postService.ts';
import LoadingSpinner from '../../../shared/features/loading-spinner/components/LoadingSpinner.tsx';
import { IUser } from '../types/IUser.ts';
import '../styles/user-posts.css';

interface UserPostsProps {
    user: IUser | null;
    closePanel: () => void;
}

export default function UserPosts({ user, closePanel }: UserPostsProps) {
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
                <div className="posts-container">
                    <div className="header">
                        <h3 className="user-name">{user?.name}</h3>
                        <button onClick={closePanel}>X</button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
