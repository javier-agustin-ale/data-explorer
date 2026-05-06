import { useState, useEffect } from 'react';
import { IPost } from '../types/IPost.ts';
import { getPostsByUserId } from '../services/postService.ts';
import LoadingSpinner from '../../../shared/features/loading-spinner/components/LoadingSpinner.tsx';
import { IUser } from '../types/IUser.ts';
import '../styles/user-posts.css';
import Post from '../../../shared/features/post/components/Post.tsx';

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
            {loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        padding: '60px 15px',
                    }}
                >
                    <LoadingSpinner showLoading={loading} />
                </div>
            ) : null}
            {!loading && posts.length ? (
                // <div className="posts-container">
                //     <div className="header">
                //         <h3 className="user-name">{user?.name}</h3>
                //         <button onClick={closePanel}>X</button>
                //     </div>
                // </div>
                <div className="posts-panel">
                    <div className="posts-panel-header">
                        <div className="posts-panel-header-title">
                            <i className="fas fa-file-alt"></i>
                            <h2>Posts by {user?.name}</h2>
                        </div>
                        <p className="posts-panel-header-meta">
                            {posts.length} posts
                        </p>
                    </div>

                    <div className="posts-container">
                        {posts.map((post, index) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                postNumber={index + 1}
                                title={post.title}
                                body={post.body}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
}
