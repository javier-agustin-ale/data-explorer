import { IUser } from '../types/IUser';
const APP_URL = 'https://jsonplaceholder.typicode.com/';

export async function getUsers(): Promise<IUser[]> {
    const res = await fetch(`${APP_URL}users`);
    return res.json();
}
