import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, AlertController, ActionSheetController, NavController, ToastController, ModalController, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;
    text: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      public translate: TranslateService,
      private screenOrientation: ScreenOrientation,
      private alert: AlertController,
      private popoverCtrl: PopoverController,
      private modalCtrl: ModalController,
      private toastCtrl: ToastController,
      private navCtrl: NavController,
      private actionSheetCtrl: ActionSheetController,
      private router: Router,
      private transService: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

        if (this.platform.is('android')) {
            this.statusBar.styleLightContent();
        } else {
            this.statusBar.styleDefault();
        }
        this.splashScreen.hide();
        this.translate.addLangs(['vi', 'en']);
          this.translate.setDefaultLang('vi');
          this.translate.get('APP').subscribe(val => {
              this.text = val;
          })
          this.platform.backButton.subscribeWithPriority(9900, async () => {
              var canBack = true;
              try {
                  const element = await this.alert.getTop();
                  if (element) {
                      canBack = false;
                      element.dismiss();
                      return;
                  } else {
                      canBack = true;
                  }
              } catch (error) {

              }

              try {
                  const element = await this.actionSheetCtrl.getTop();
                  if (element) {
                      canBack = false;
                      element.dismiss();
                      return;
                  } else {
                      canBack = true;
                  }
              } catch (error) {

              }

              // close popover
              try {
                  const element = await this.popoverCtrl.getTop();
                  if (element) {
                      canBack = false;
                      element.dismiss();
                      return;
                  } else {
                      canBack = true;
                  }
              } catch (error) {
              }

              // close modal
              try {
                  const element = await this.modalCtrl.getTop();
                  if (element) {
                      canBack = false;
                      element.dismiss();
                      return;
                  } else {
                      canBack = true;
                  }
              } catch (error) {
                  console.log(error);
              }
              //if (canBack) {
              //    this.navCtrl.back();
              //}
              this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
                  if (this.router.url.indexOf('tabs/tab1') != -1) {
                      if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                          // this.platform.exitApp(); // Exit from app
                          navigator['app'].exitApp(); // work for ionic 4

                      } else {
                          const toast = await this.toastCtrl.create({
                              message: this.text['EXIT_MSG'],
                              duration: 2000,
                              position: 'bottom'
                          });
                          toast.present();
                          this.lastTimeBackPress = new Date().getTime();
                      }
                  }
                  else if (this.router.url.indexOf('tab2') != -1 ||
                      this.router.url.indexOf('tab3') != -1 ||
                      this.router.url.indexOf('tab4') != -1 ||
                      this.router.url.indexOf('tab5') != -1) {
                      this.navCtrl.navigateBack(`/tabs/tab1`)
                  } else if (outlet && outlet.canGoBack()) {
                      outlet.pop();
                  }
              });

          });
          if (this.platform.is('mobileweb') || this.platform.is('desktop')) {

          } else {
              
          }
    });
  }
}
