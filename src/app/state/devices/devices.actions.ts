import { createAction, Action } from '@ngrx/store';
import { DeviceInfo } from 'src/app/models/login-out.model';
import { DeviceInforOutModel, DeviceStatusOutModel } from 'src/app/models/device-info-out.model';
import { DeviceStatusInModel } from 'src/app/models/device-info-in.model';
export enum ActionTypes {
    LIST_USER_DEVICE = '[DEVICES] LIST_USER_DEVICE',
    LIST_USER_DEVICE_SUCCESS = '[DEVICES] LIST_USER_DEVICE_SUCCESS',
    LIST_USER_DEVICE_FAIL = '[DEVICES] LIST_USER_DEVICE_FAIL',
    GET_STATUS_DEVICE = '[DEVICES] GET_STATUS_DEVICE',
    GET_STATUS_DEVICE_SUCCESS = '[DEVICES] GET_STATUS_DEVICE_SUCCESS',
    GET_STATUS_DEVICE_FAIL = '[DEVICES] GET_STATUS_DEVICE_FAIL'


}
export class GetListDevices implements Action {
    readonly type = ActionTypes.LIST_USER_DEVICE;
    constructor() { }
}
export class GetListDevicesSuccess implements Action {
    readonly type = ActionTypes.LIST_USER_DEVICE_SUCCESS;
    constructor(public payload: DeviceInforOutModel) { }
}

export class GetListDevicesFail implements Action {
    readonly type = ActionTypes.LIST_USER_DEVICE_FAIL;
    constructor(public payload: any) { }
}

export class GetStatusDevices implements Action {
    readonly type = ActionTypes.GET_STATUS_DEVICE;
    constructor(public payload: DeviceStatusInModel) { }
}

export class GetStatusDevicesSuccess implements Action {
    readonly type = ActionTypes.GET_STATUS_DEVICE_SUCCESS;
    constructor(public payload: DeviceStatusOutModel[]) { }
}

export class GetStatusDevicesFail implements Action {
    readonly type = ActionTypes.GET_STATUS_DEVICE_FAIL;
    constructor(public payload: any) { }
}

export type devicesActions =
    GetListDevices |
    GetListDevicesSuccess |
    GetListDevicesFail |
    GetStatusDevices |
    GetStatusDevicesSuccess |
    GetStatusDevicesFail