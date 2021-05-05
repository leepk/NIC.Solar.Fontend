import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceModule } from './services/service.module';
import { AppConfig } from './services/app.config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { TranslateService, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ErrorDialogUtils } from './shared/utils/error-dialog.utils';
import { StateModule } from './state/state.module';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeVi);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot({
            backButtonText: '',
            mode: "ios",
        }),
        StateModule.forRoot(),
        ServiceModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        NgHttpLoaderModule.forRoot(),
        IonicStorageModule.forRoot(),
        //SharedModule
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
        })
    ],
  providers: [
    StatusBar,
      SplashScreen,
      ScreenOrientation,
      QRScanner,
      ErrorDialogUtils,
      Geolocation,
      WifiWizard2,
      //AppConfig, { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },
      { provide: LOCALE_ID, useValue: 'vi-VN' },

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }

//export function initConfig(appConfig: AppConfig) {
//    return () => appConfig.load();
//}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}