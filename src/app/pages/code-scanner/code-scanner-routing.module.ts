import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeScannerPage } from './code-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: CodeScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeScannerPageRoutingModule {}
