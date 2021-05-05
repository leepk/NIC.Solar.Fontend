import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';
import { LoginInModel } from 'src/app/models/login-in.model';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorDialogUtils } from 'src/app/shared/utils/error-dialog.utils';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    hide = true;
    loginParam = <LoginInModel>{};
    isAutoLogin: boolean = false;
    textTrans: any;
    constructor(public translate: TranslateService, private errDialog: ErrorDialogUtils,
        private router: Router, private userService: UsersService,
        public actionSheetController: ActionSheetController, private store: Storage) {
    }

    ngOnInit() {
        this.translate.get('LOGIN').subscribe(val => {
            this.textTrans = val;
        });
        this.store.get("autologin").then(val => {
            if (val) {
                this.loginParam = val;
                this.login();
                this.isAutoLogin = true;
            }
        })
        .catch(err => {
            this.store.remove("autologin");
            this.isAutoLogin = false;
        }); 
    }

    async changeLang() {
        const actionSheet = await this.actionSheetController.create({
            cssClass: 'my-custom-class',
            buttons: [{
                text: 'Việt Nam',
                handler: () => {
                    this.translate.use('vi')
                }
            }, {
                text: 'English',
                handler: () => {
                    this.translate.use('en')
                }
            }]
        });
        await actionSheet.present();
    }

    login() {
        if (this.checkValid()) {
            this.userService.login(this.loginParam).subscribe(val => {
                if (val.statusCode == '00') {
                    if (this.isAutoLogin) {
                        this.store.set("autologin", this.loginParam); 
                    }
                    //var devices = val.devices;
                    this.router.navigate([`./tabs`], {
                        //state: {
                        //    devices: devices
                        //}
                        replaceUrl: true
                    });
                }
               
            })
        }
    }

    checkValid(): boolean {
        if (this.loginParam.acountname == null || this.loginParam.acountname == '') {
            this.errDialog.openDialogOK(this.textTrans['USERNAME_PLACEHOLDER']);
            return false;
        }

        if (this.loginParam.password == null || this.loginParam.password == '') {
            this.errDialog.openDialogOK(this.textTrans['PASSWORD_PLACEHOLDER']);
            return false;
        }

        return true;
    }

    signUp() {
        this.router.navigate([`new-user`]);
    }

    rsPass() {
        this.router.navigate([`login/reset-password`]);
    }

    changeAutoLogin() {
        if (!this.isAutoLogin) {
            this.store.remove("autologin");
        }
    }
}
