import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPlantPageRoutingModule } from './details-plant-routing.module';

import { DetailsPlantPage } from './details-plant.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      DetailsPlantPageRoutingModule,
      SharedModule
  ],
  declarations: [DetailsPlantPage]
})
export class DetailsPlantPageModule {}
