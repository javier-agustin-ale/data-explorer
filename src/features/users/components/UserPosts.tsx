import { useState, useEffect } from 'react';
import { IPost } from '../../../shared/features/post/interfaces/IPost.ts';
import { getPostsByUserId } from '../services/postService.ts';
import LoadingSpinner from '../../../shared/features/loading-spinner/components/LoadingSpinner.tsx';
import { IUser } from '../interfaces/IUser.ts';
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
            <div className="posts-panel">
                {loading ? (
                    <div className="loading-posts">
                        <LoadingSpinner showLoading={loading} />
                    </div>
                ) : (
                    <>
                        <div className="posts-panel-header">
                            <div className="posts-panel-header-title">
                                <h2>Posts by {user?.name}</h2>
                                <button
                                    className="close-btn"
                                    onClick={closePanel}
                                >
                                    X
                                </button>
                            </div>
                            <p className="posts-panel-header-meta">
                                {posts.length} posts
                            </p>
                        </div>

                        <div className="posts-container">
                            {posts.length == 0 ? (
                                <p className="no-posts">
                                    This user has no posts.
                                </p>
                            ) : (
                                posts.map((post, index) => (
                                    <Post
                                        key={post.id}
                                        post={post}
                                        postNumber={index + 1}
                                    />
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
