import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginPageModule)

    },
  {
    path: 'new-user',
    loadChildren: () => import('./pages/user/new-user/new-user.module').then( m => m.NewUserPageModule)
  },
  {
    path: 'search-plant',
    loadChildren: () => import('./pages/search-plant/search-plant.module').then( m => m.SearchPlantPageModule)
  },
  {
    path: 'details-plant/:id/:name',
    loadChildren: () => import('./pages/details-plant/details-plant.module').then( m => m.DetailsPlantPageModule)
  },
  {
    path: 'add-device',
    loadChildren: () => import('./pages/add-device/add-device.module').then( m => m.AddDevicePageModule)
  },
  {
    path: 'device-list/:id',
    loadChildren: () => import('./pages/device-list/device-list.module').then( m => m.DeviceListPageModule)
  },
  {
    path: 'smart-energy-center/:id',
    loadChildren: () => import('./pages/smart-energy-center/smart-energy-center.module').then( m => m.SmartEnergyCenterPageModule)
  },
  {
    path: 'my',
    loadChildren: () => import('./pages/user/my/my.module').then( m => m.MyPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/user/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'plant-distribution',
    loadChildren: () => import('./pages/plant-distribution/plant-distribution.module').then( m => m.PlantDistributionPageModule)
  },
  {
    path: 'code-scanner',
    loadChildren: () => import('./pages/code-scanner/code-scanner.module').then( m => m.CodeScannerPageModule)
  },
  {
    path: 'map-user-device/:id',
    loadChildren: () => import('./pages/map-user-device/map-user-device.module').then( m => m.MapUserDevicePageModule)
  },
  {
    path: 'wifi-config',
    loadChildren: () => import('./pages/wifi-config/wifi-config.module').then( m => m.WifiConfigPageModule)
  },
  {
    path: 'edit-device/:id',
    loadChildren: () => import('./pages/edit-device/edit-device.module').then( m => m.EditDevicePageModule)
  },



  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
