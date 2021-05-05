import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OMPageRoutingModule } from './o-m-routing.module';

import { OMPage } from './o-m.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlantStatusComponent } from './plant-status/plant-status.component';
import { DeviceAlarmComponent } from './device-alarm/device-alarm.component';
import { MobileComponent } from './mobile/mobile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      OMPageRoutingModule,
      SharedModule
    ],
    declarations: [OMPage, PlantStatusComponent, DeviceAlarmComponent, MobileComponent],
    exports: [OMPage]
})
export class OMPageModule {}
