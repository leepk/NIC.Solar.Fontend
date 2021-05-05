import { Component, OnInit } from '@angular/core';
import { ChangepswInModel } from 'src/app/models/change-password-in.model';
import { Location } from '@angular/common';
import { ErrorDialogUtils } from 'src/app/shared/utils/error-dialog.utils';
import { UsersService } from 'src/app/services/users/users.service';
import { Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    hide = true;
    hide2 = true;
    hide3 = true;
    //pwFormControl = new FormControl('', [
    //    Validators.required,
    //]);
    changePwParams = <ChangepswInModel>{}
    confirmPW: string;
    textTrans: any;

    constructor(private location: Location, public translate: TranslateService,
        private userService: UsersService, private errDialog: ErrorDialogUtils) { }

    ngOnInit() {
        this.translate.get('CHANGEPASSWORD').subscribe(val => {
            this.textTrans = val;
        });
    }

    confirm() {
        if (this.checkValid()) {
            this.userService.chagePassword(this.changePwParams).subscribe(val => {
                this.errDialog.openDialogResponse(val).then(val => {
                    if (val) {
                        this.location.back();
                    }
                })
            });
        }
    }

    checkValid(): boolean {
        console.log(this.changePwParams.new_password)
        if (this.changePwParams.new_password == null || this.changePwParams.new_password == '') {
            this.errDialog.openDialogOK(this.textTrans['NEWPASSWORD_PLACEHOLDER']);
            return false;
        }
        if (this.confirmPW == null || this.confirmPW == '') {
            this.errDialog.openDialogOK(this.textTrans['CONFIRMPASSWORD_PLACEHOLDER']);
            return false;
        }
        if (this.changePwParams.old_password == null || this.changePwParams.old_password == '') {
            this.errDialog.openDialogOK(this.textTrans['OLDPASSWORD_PLACEHOLDER']);
            return false;
        }
        if (this.changePwParams.new_password != this.confirmPW) {
            this.errDialog.openDialogOK(this.textTrans['ERROR_CHECK_PASSWORD']);
            return false;
        }
        return true;
    }
}
