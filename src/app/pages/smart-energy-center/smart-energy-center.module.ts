import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartEnergyCenterPageRoutingModule } from './smart-energy-center-routing.module';

import { SmartEnergyCenterPage } from './smart-energy-center.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RealTimeInfoComponent } from './real-time-info/real-time-info.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { AlarmInfoComponent } from './alarm-info/alarm-info.component';
import { HistoricalInfoComponent } from './historical-info/historical-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      SmartEnergyCenterPageRoutingModule,
      SharedModule
  ],
    declarations: [SmartEnergyCenterPage, RealTimeInfoComponent, DeviceInfoComponent,
        HistoricalInfoComponent, AlarmInfoComponent],
   // exports: [DeviceInfoComponent, RealTimeInfoComponent, HistoricalInfoComponent, AlarmInfoComponent]
})
export class SmartEnergyCenterPageModule {}
