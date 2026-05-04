import { IUserAddress } from './IUserAddress';
import { ICompany } from '../../../shared/types/ICompany';

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IUserAddress;
    phone: string;
    website: string;
    company: ICompany;
}
