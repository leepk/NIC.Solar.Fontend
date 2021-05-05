import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapUserDevicePageRoutingModule } from './map-user-device-routing.module';

import { MapUserDevicePage } from './map-user-device.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      MapUserDevicePageRoutingModule,
      SharedModule
  ],
  declarations: [MapUserDevicePage]
})
export class MapUserDevicePageModule {}
