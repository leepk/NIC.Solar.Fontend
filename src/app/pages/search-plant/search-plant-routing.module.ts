import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPlantPage } from './search-plant.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPlantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPlantPageRoutingModule {}
