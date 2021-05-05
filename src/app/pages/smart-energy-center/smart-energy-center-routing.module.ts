import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartEnergyCenterPage } from './smart-energy-center.page';

const routes: Routes = [
  {
    path: '',
    component: SmartEnergyCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartEnergyCenterPageRoutingModule {}
