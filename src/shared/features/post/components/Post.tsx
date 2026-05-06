import '../styles/post.css';

interface PostProps {
    id: number;
    postNumber: number;
    title: string;
    body: string;
}
export default function Post({ id, title, body, postNumber }: PostProps) {
    return (
        <div className="post-item">
            <span className="post-badge">Post #{postNumber}</span>
            <h3 className="post-title">{title}</h3>
            <p className="post-body">{body}</p>
        </div>
    );
}
