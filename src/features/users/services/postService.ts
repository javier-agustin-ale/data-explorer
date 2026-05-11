import { IPost } from '../../../shared/features/post/interfaces/IPost';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts/';

export async function getPostsByUserId(userId: number): Promise<IPost[]> {
    if (!userId) return [];
    const res = await fetch(`${POSTS_URL}?userId=${userId}`);
    return res.json();
}
