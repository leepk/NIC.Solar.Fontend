import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OMPageModule } from '../pages/o-m/o-m.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
      OMPageModule,
      Tab2PageRoutingModule,
      SharedModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}