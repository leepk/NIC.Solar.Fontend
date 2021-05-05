import { Component, OnInit } from '@angular/core';
import { NewAccInModel } from 'src/app/models/new-account-in.model';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorDialogUtils } from 'src/app/shared/utils/error-dialog.utils';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
    hide = true;
    confirmPW: string;

    accountParam = <NewAccInModel>{
        admin: '0'
    };
    textTrans: any;

    constructor(private route: Router, private location: Location, public translate: TranslateService,
        private userService: UsersService, private errDialog: ErrorDialogUtils) { }

    ngOnInit() {
        this.translate.get('NEWUSER').subscribe(val => {
            this.textTrans = val;
        })
    }

    create() {
        if (this.checkValid()) {
            this.userService.createAccount(this.accountParam).subscribe(val => {
                this.errDialog.openDialogResponse(val).then(val => {
                    if (val) {
                        this.location.back();
                    }
                })
            });
        }
       
    }

    checkValid(): boolean {
        if (this.accountParam.acountname == null || this.accountParam.acountname == '') {
            this.errDialog.openDialogOK(this.textTrans['USERNAME_PLACEHOLDER']);
            return false;
        }

        if (this.accountParam.fullName == null || this.accountParam.fullName == '') {
            this.errDialog.openDialogOK(this.textTrans['FULLNAME_PLACEHOLDER']);
            return false;
        }

        if (this.accountParam.password == null || this.accountParam.password == '') {
            this.errDialog.openDialogOK(this.textTrans['PASSWORD_PLACEHOLDER']);
            return false;
        }
        //if (this.confirmPW == null || this.confirmPW == '') {
        //    this.errDialog.openDialogOK('Please enter the confirm password');
        //    return false;
        //}
        if (this.accountParam.email == null || this.accountParam.email == '') {
            this.errDialog.openDialogOK(this.textTrans['EMAIL_PLACEHOLDER']);
            return false;
        }

        //if (this.accountParam.password == this.confirmPW) {
        //    this.errDialog.openDialogOK('Password and confirm password does not match');
        //    return false;
        //}
        return true;
    }
}
