import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tab5Page } from './tab5.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab5PageRoutingModule } from './tab5-routing.module'
import { SharedModule } from '../shared/shared.module';
import { DeviceListPageModule } from '../pages/device-list/device-list.module';
import { WifiConfigPageModule } from '../pages/wifi-config/wifi-config.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //SmartConfigPageModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }]),
      Tab5PageRoutingModule,
      SharedModule,
      //DeviceListPageModule,
      WifiConfigPageModule
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule {}
