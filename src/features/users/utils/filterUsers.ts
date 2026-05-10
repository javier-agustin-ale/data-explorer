import { IUser } from '../interfaces/IUser';

export default function filterUsers(
    searchTerm: string,
    data: IUser[],
): IUser[] {
    if (!searchTerm) return data;
    const termLowerCase = searchTerm.toLocaleLowerCase();
    return data.filter(
        (item: IUser) =>
            item.name.toLocaleLowerCase().includes(termLowerCase) ||
            item.username.toLocaleLowerCase().includes(termLowerCase) ||
            item.email.toLocaleLowerCase().includes(termLowerCase) ||
            item.phone.toLocaleLowerCase().includes(termLowerCase),
    );
}
