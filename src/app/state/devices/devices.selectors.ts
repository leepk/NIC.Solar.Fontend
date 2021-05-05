import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as deviceReducer from './devices.reducer';
import { State as AptState } from './devices.reducer';

import { ActionReducerMap, MetaReducer } from '@ngrx/store';


export const getDeviceState = createFeatureSelector<AptState>('devices');

export const getListDeviceUser = createSelector(
    getDeviceState,
    deviceReducer.getListDeviceUser,
);

export const setStatusDevice = createSelector(
    getDeviceState,
    deviceReducer.setStatusDevice,
);
