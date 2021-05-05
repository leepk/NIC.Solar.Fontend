import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantDistributionPageRoutingModule } from './plant-distribution-routing.module';

import { PlantDistributionPage } from './plant-distribution.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      PlantDistributionPageRoutingModule,
      SharedModule
  ],
  declarations: [PlantDistributionPage]
})
export class PlantDistributionPageModule {}
