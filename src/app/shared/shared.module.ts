import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YoutubeSafeUrlPipe } from './pipes/youtube-safe-url.pipe';
import { VarDirective } from './directives/ng-var.directive';
import { FormatGiaDichVuPipe } from './pipes/format-giadv.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { ErrorDialogUtils } from './utils/error-dialog.utils';
import { DelayClickDirective } from './directives/delay-click.directive';
import { MomentModule } from 'ngx-moment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpLoaderFactory } from '../app.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { HideHeaderDirective } from './directives/hide-header.directive';
import { MatSelectModule } from '@angular/material/select';
import { PlantComponent } from '../components/plant/plant.component';
import { EnergyRevenueComponent } from '../components/energy-revenue/energy-revenue.component';
import { EnviromentalContributionComponent } from 'src/app/components/enviromental-contribution/enviromental-contribution.component';
import { HomeBarChartComponent } from 'src/app/components/home-bar-chart/home-bar-chart.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EnergyManagementComponent } from '../components/energy-management/energy-management.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EnergyFlowComponent } from '../components/energy-flow/energy-flow.component';
import { IonicModule } from '@ionic/angular';
import { EnergyFlowArrowComponent } from '../components/energy-flow-arrow/energy-flow-arrow.component';
import { EnergyFlowStopComponent } from '../components/energy-flow-stop/energy-flow-stop.component';
import { GoogleMapComponent } from '../components/google-map/google-map.component';
import { TemperatureConverterPipe } from './pipes/temperature-converter.pipe';
import { LinkJapanHomePageComponent} from '../components/link-japan-home-page/link-japan-home-page.component'

const components = [
    PlantComponent,
    EnergyRevenueComponent,
    EnviromentalContributionComponent,
    HomeBarChartComponent,
    EnergyManagementComponent,
    EnergyFlowComponent,
    EnergyFlowArrowComponent,
    EnergyFlowStopComponent,
    GoogleMapComponent,
    LinkJapanHomePageComponent
];
const pipes = [
  YoutubeSafeUrlPipe,
  VarDirective,
  FormatGiaDichVuPipe,
  SafeHtmlPipe,
    AutofocusDirective,
    DelayClickDirective,
    HideHeaderDirective,
    TemperatureConverterPipe
  //StatusPhieuDv, GenderParse, MilliParse, InsuranceParse, MinToBlockPipe, Capitalize
]
const modules = [
  FormsModule,
    RouterModule,
    MomentModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    IonicModule
]
@NgModule({
  imports: [
      CommonModule,
      ...modules,
      TranslateModule.forChild({
          loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      }),
    
    
  ],
  declarations: [...components, ...pipes],
    exports: [
        TranslateModule,
    ...modules,
    ...components,
    ...pipes
  ],
  providers: [
    // UserPatientUtils

    //MatDatepickerModule,
    //MatNativeDateModule,
    //{ provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
  ],
  entryComponents: [
    //PopoverMoreComponent
  ],
})
export class SharedModule { }
