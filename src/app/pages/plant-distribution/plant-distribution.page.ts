import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
import * as fromStore from 'src/app/state/app.reducer';
import * as fromDevicesAction from 'src/app/state/devices/devices.actions';
import * as fromDevicesSelector from 'src/app/state/devices/devices.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceInfo } from 'src/app/models/login-out.model';

@Component({
  selector: 'app-plant-distribution',
  templateUrl: './plant-distribution.page.html',
  styleUrls: ['./plant-distribution.page.scss'],
})
export class PlantDistributionPage implements OnInit {
    @ViewChild(GoogleMapComponent) mapComponent: GoogleMapComponent;
    devices$: Observable<DeviceInfo[]>;
    cssAnimation: string = 'hidden-grid';
    selectedDevice: DeviceInfo;
    constructor(private store: Store<fromStore.AppState>) {
        this.devices$ = this.store.select(fromDevicesSelector.getListDeviceUser);
    }

    ngOnInit() {
        //setTimeout(() => {
        //    this.mapComponent.addMarker(14.058324, 108.277199);
        //}, 5000)
    }

    selected(item) {
        this.cssAnimation = "visible-grid";
        console.log(111, item)
        this.selectedDevice = item;
    }
}
