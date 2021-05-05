import { BaseOutModel } from './base-out.model';

export interface LoginInModel extends BaseOutModel
{
    acountname: string;
    password: string;
}