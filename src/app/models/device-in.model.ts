export interface DeviceInModel {
    deviceId: string;
    serialNumber: string;
    deviceName: string;
    manufacturer: string;
    manufactureDate: Date;
    saleDate: Date;
    address: string;
    pantType: string;
    pantNumber: number;
    pantCapacity: number;
    batteryType: string;
    batteryCapacity: number;
    latitude: number;
    longitude: number;
    active: string;
    name: string;
    inverterType: string;
    inverterCapacity: number;
}

export interface DeviceUserInModel {
    acountname: string;
    deviceId: string;
}