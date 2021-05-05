import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';
import { HttpConfigInterceptor } from './httpconfig.interceptor';
import { UsersService } from './users/users.service';
import { DevicesService } from './devices/devices.service';
import { WeatherService } from './weather/weather.service';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule,
    ],
  providers: [
      UsersService,
      DevicesService,
      WeatherService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class ServiceModule {
    static forRoot(): ModuleWithProviders<ServiceModule> {
        return {
            ngModule: ServiceModule
        };
    }

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: ServiceModule
    ) {
        if (parentModule) {
            throw new Error(
                'ServiceModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}
