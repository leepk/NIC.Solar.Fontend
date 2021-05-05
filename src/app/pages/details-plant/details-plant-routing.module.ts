import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPlantPage } from './details-plant.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPlantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPlantPageRoutingModule {}
