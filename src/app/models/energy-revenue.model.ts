import { EnergyManagementModel } from './energy-management.model';

export interface EnergyRevenuetModel extends EnergyManagementModel
{
    deviceID: string;
    TransactionDate: Date;
    xdata: number;
    incoming: number;
    outcoming: number;
}