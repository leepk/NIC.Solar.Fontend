import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromDevice from './devices/devices.reducer';

export interface AppState {
    devices: fromDevice.State;
   
}
export const appReducer: ActionReducerMap<AppState> = {
    devices: fromDevice.devciesReducer
};
