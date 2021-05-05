import { LoginOutModel } from './login-out.model';

export interface DeviceInforOutModel extends LoginOutModel {

}

export interface DeviceInfoOnDay {
    deviceID: string;
    PantToInverter: number;

    PantInverterToHome: number;
    GridInverterToHome: number;

    InverterToGrid: number;
    GridToInverter: number;

    InverterToBattery: number;
    BatteryToInverter: number;
}

export interface DeviceInfoOnFull{
    TransactionDate: Date;
    TransactionDay: string;
    TransactionYear: string;
    deviceID: string;
    incomingday: number;
    incominglifetime: number;
    incomingmonth: number;
    incomingyear: number;
    moneyincomingday: number;
    moneyincominglifetime: number;
    moneyincomingmonth: number;
    moneyincomingyear: number;
}

export interface DeviceStatusOutModel {
    deviceID: string;
    active: string;
}