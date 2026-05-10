import { IUser } from "../interfaces/IUser";
import { SortDirection } from "../types/SortDirection.ts";
import { SortableUserField } from "../types/SortableUserField.ts";

export function sortData(data: IUser[], colName: string, direction: SortDirection): IUser[] {

const fieldName = colName.toLowerCase() as SortableUserField;
 
    const columnToFieldMap: Record<string, SortableUserField> = {
        '#': 'id',
        'name': 'name',
        'email': 'email',
        'user name': 'username',
        'phone': 'phone',
    };
 
    const field: SortableUserField | undefined = columnToFieldMap[fieldName];
 
    if (!field) {
        return data;
    }
 
    return [...data].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];
 
        if (field === 'id') {
            const numA = Number(valueA);
            const numB = Number(valueB);
            return direction === 'asc' ? numA - numB : numB - numA;
        }
 
        const stringA = String(valueA).toLowerCase();
        const stringB = String(valueB).toLowerCase();
 
        if (direction === 'asc') {
            return stringA.localeCompare(stringB);
        } else {
            return stringB.localeCompare(stringA);
        }
    });

}