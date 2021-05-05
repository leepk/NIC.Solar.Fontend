import { BaseOutModel } from './base-out.model';

export interface EnergyManagementModel extends BaseOutModel
{
    deviceID: string;
    TransactionDate: Date;
    xdata: number;
    incoming: number;
    outcoming: number;
}