import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { Tab4PageRoutingModule } from './tab4-routing.module'
import { SharedModule } from '../shared/shared.module';
import { MyPageModule } from '../pages/user/my/my.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
      MyPageModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }]),
      Tab4PageRoutingModule,
      SharedModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
