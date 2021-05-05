import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapUserDevicePage } from './map-user-device.page';

const routes: Routes = [
  {
    path: '',
    component: MapUserDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapUserDevicePageRoutingModule {}
