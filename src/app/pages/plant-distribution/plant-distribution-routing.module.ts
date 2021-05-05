import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantDistributionPage } from './plant-distribution.page';

const routes: Routes = [
  {
    path: '',
    component: PlantDistributionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantDistributionPageRoutingModule {}
