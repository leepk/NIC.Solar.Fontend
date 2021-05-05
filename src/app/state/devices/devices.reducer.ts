import { createReducer, on } from '@ngrx/store';
import * as devicesAction from './devices.actions';
import { DeviceInfo } from 'src/app/models/login-out.model';
import { DeviceStatusOutModel } from 'src/app/models/device-info-out.model';

export interface State {
    devicesInfo: DeviceInfo[],
    statusDevice: DeviceStatusOutModel[]
}
export var initialState: State = {
    devicesInfo: null,
    statusDevice: null
};
export function devciesReducer(state = initialState, action: devicesAction.devicesActions) {
    switch (action.type) {

        case devicesAction.ActionTypes.LIST_USER_DEVICE: {
            return {
                ...state,
            };
        }
        case devicesAction.ActionTypes.LIST_USER_DEVICE_SUCCESS: {
            return {
                ...state,
                devicesInfo: action.payload.devices
            };
        }

        case devicesAction.ActionTypes.LIST_USER_DEVICE_FAIL: {
            return {
                ...state,
                //error: 'error loading DsPhieuDv'
            };
        }

        case devicesAction.ActionTypes.GET_STATUS_DEVICE: {
            return {
                ...state,
            };
        }
        case devicesAction.ActionTypes.GET_STATUS_DEVICE_SUCCESS: {
            return {
                ...state,
                statusDevice: action.payload
            };
        }

        case devicesAction.ActionTypes.GET_STATUS_DEVICE_FAIL: {
            return {
                ...state,
                //error: 'error loading DsPhieuDv'
            };
        }
        default: {
            return state;
        }
    }
}
export const getListDeviceUser = (state: State) => state.devicesInfo;
export const setStatusDevice = (state: State) => state.statusDevice;
