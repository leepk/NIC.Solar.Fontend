import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorDialogUtils } from 'src/app/shared/utils/error-dialog.utils';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';

import { from } from 'rxjs';

//declare var espSmartconfig: any;
declare var esptouch;
@Component({
  selector: 'app-wifi-config',
  templateUrl: './wifi-config.page.html',
  styleUrls: ['./wifi-config.page.scss'],
})
export class WifiConfigPage implements OnInit {
  hide = true;
  network = {
    ssid: null,
    bssid: null,
    password: null,
  };
  statusMessage = 'Awaiting action.';
  textTrans: any;
  config = false;
  resultsSSID = '';
  screenChange: any;
  constructor(private router: Router, private menu: MenuController,
    private route: ActivatedRoute, public auth: AuthenticationService,
    public translate: TranslateService, private errDialog: ErrorDialogUtils,
    private wifiWizard2: WifiWizard2, private zone: NgZone) {
  }

  ngOnInit() {
    this.translate.get('WIFI_SETTINGS').subscribe(val => {
      this.textTrans = val;
    });
    this.statusMessage = '';
    this.getCurrentSSID();
  }
  // async getNetworks() {
  //   try {
  //     let results = await this.wifiWizard2.listNetworks();
  //     this.results = results;
  //     console.log('List SSID' + JSON.stringify(this.results));
  //   } catch (error) {}
  // }

  async getCurrentSSID() {
    try {
      let results = await this.wifiWizard2.getConnectedSSID();
      this.resultsSSID = results;
      console.log('List SSID' + JSON.stringify(this.resultsSSID));
      this.network.ssid = this.resultsSSID;
    }
    catch { }
  }
  doConfig() {
    if (this.checkValid()) {
      this.config = true;
      console.log('ESP:' + 'Configuring...');
      this.statusMessage = this.textTrans['COMFIRM'] + '...';
      esptouch.start(this.network.ssid, "00:00:00:00:00:00", this.network.password, "1", "1",
        res => {
          console.log('Config Success: ' + res);
          this.errDialog.openDialogOK(this.textTrans['SUCCESS']);
          this.stopConfig();
        },
        err => {
          console.log('Config error: ' + err);
          this.errDialog.openDialogOK(this.textTrans['FAIL']);
          this.stopConfig();
        });
    }
  }
  stopConfig() {

    console.log('ESP:' + this.config + 'Stopping...');
    this.zone.run(() => {
      this.config = false;
      this.statusMessage = '';
    });
    esptouch.stop(
      res => {
        console.log('Stop success: ' + res)        
      },
      err => {
        console.log('Stop error:' + err)        
      });
    console.log('ESP: Stopped');
  }
  checkValid(): boolean {
    if (this.network.ssid == null || this.network.ssid == '') {
      this.errDialog.openDialogOK(this.textTrans['SSID_REQUIRED']);
      return false;
    }
    if (this.network.bssid == null || this.network.bssid == '') {
      // this.errDialog.openDialogOK(this.textTrans['BSSID_REQUIRED']);
      // return false;
      this.network.bssid = ''
    }
    if (this.network.password == null || this.network.password == '') {
      this.errDialog.openDialogOK(this.textTrans['PASS_REQUIRED']);
      return false;
    }


    return true;
  }
}
