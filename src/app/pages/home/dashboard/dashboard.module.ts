import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SildesHomeComponent } from 'src/app/components/sildes-home/sildes-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      DashboardPageRoutingModule,
      SharedModule
  ],
    declarations: [DashboardPage, SildesHomeComponent],
    exports: [DashboardPage]

})
export class DashboardPageModule {}
