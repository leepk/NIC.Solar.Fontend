import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WifiConfigPageRoutingModule } from './wifi-config-routing.module';

import { WifiConfigPage } from './wifi-config.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WifiConfigPageRoutingModule,
    SharedModule
  ],
  declarations: [WifiConfigPage],
  exports: [WifiConfigPage]
})
export class WifiConfigPageModule {}
