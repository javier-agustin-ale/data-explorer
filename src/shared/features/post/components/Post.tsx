import '../styles/post.css';
import { IPost } from '../interfaces/IPost';

interface PostProps {
    post: IPost;
    postNumber: number;
}
export default function Post({ post, postNumber }: PostProps) {
    return (
        <div className="post-item">
            <span className="post-badge">Post #{postNumber}</span>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
        </div>
    );
}
