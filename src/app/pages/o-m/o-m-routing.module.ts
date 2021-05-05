import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OMPage } from './o-m.page';

const routes: Routes = [
  {
    path: '',
    component: OMPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OMPageRoutingModule {}
