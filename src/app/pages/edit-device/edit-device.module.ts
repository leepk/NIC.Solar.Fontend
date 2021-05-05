import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDevicePageRoutingModule } from './edit-device-routing.module';

import { EditDevicePage } from './edit-device.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDevicePageRoutingModule,
    SharedModule
  ],
  declarations: [EditDevicePage]
})
export class EditDevicePageModule {}
