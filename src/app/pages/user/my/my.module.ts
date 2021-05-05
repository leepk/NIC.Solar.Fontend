import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPageRoutingModule } from './my-routing.module';

import { MyPage } from './my.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      MyPageRoutingModule,
      SharedModule
  ],
  declarations: [MyPage]
})
export class MyPageModule {}
