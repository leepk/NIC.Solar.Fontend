import { BaseOutModel } from './base-out.model';

export interface LoginOutModel extends BaseOutModel
{     
    devices: DeviceInfo[];
    admin: string;
     token: string;   
}

export interface EditDeviceOutModel extends BaseOutModel
{     
    device: DeviceInfo;  
}

export interface DeviceInfo
{
    deviceId: string;
    deviceType: string;
    serialNumber: string;
    name: string;
    manufacturer: string;
    manufactureDate: Date | string;
    admin: string;
    fullName: string;
    batteryCapacity: string;
    batteryType: number;
    capacity: string;
    pantCapacity: string;
    pantNumber: number;
    pantType: string;
    address: string;
    latitude: number;
    longitude: number;
    active: string;
}