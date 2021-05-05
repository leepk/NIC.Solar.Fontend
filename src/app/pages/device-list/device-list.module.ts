import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceListPageRoutingModule } from './device-list-routing.module';

import { DeviceListPage } from './device-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      DeviceListPageRoutingModule,
      SharedModule
  ],
    declarations: [DeviceListPage],
    exports: [DeviceListPage]

})
export class DeviceListPageModule {}
