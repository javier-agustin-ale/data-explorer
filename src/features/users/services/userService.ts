import { IUser } from '../types/IUser';
const USERS_URL = 'https://jsonplaceholder.typicode.com/';

export async function getUsers(): Promise<IUser[]> {
    const res = await fetch(`${USERS_URL}users`);
    return res.json();
}
