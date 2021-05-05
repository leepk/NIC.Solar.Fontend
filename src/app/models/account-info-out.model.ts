import { BaseOutModel } from './base-out.model';

export interface AcountInfoOutModel extends BaseOutModel
{
    acounts: AcountInfo[];
}
export interface AcountInfo
{
    acountname: string;
    phone: string;
    email: string;
    admin: string;
    fullName: string;
    address: string;
}

export interface AcountOfDevice {
    acountName: string;
    fullName: string;
}