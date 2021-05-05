import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPlantPageRoutingModule } from './search-plant-routing.module';

import { SearchPlantPage } from './search-plant.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      SearchPlantPageRoutingModule,
      SharedModule
  ],
    declarations: [SearchPlantPage],

})
export class SearchPlantPageModule {}
