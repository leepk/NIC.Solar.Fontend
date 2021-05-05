import { Injectable } from '@angular/core';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertController } from '@ionic/angular';
import { HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseOutModel } from 'src/app/models/base-out.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorDialogUtils {

    constructor(public _alert: AlertController, public http: HttpClient, private translate: TranslateService) { }
    async openDialog(data) {
        console.log("ErrorDialogService openDialog");
        const alert = await this._alert.create({
            message: data,
            buttons: [
                {
                    text: 'Không',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Có',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        await alert.present();
    }

    async openDialogOK(data) {
        // close popover
        try {
            const element = await this._alert.getTop();
            if (element) {
                return;
            }
        } catch (error) {
            console.log(`openDialogOK  catch (error)`, error);
        }
        return new Promise(async (resolve) => {
            const confirm = await this._alert.create({
                message: data,
                buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                            return resolve(true);
                        },
                    },
                ],
            });

            await confirm.present();
        });
    }

    async warn(msg: string, title?: string) {
        return new Promise(async (resolve) => {
            const confirm = await this._alert.create({
                header: title,
                message: msg,
                buttons: [
                    {
                        text: 'Không',
                        role: 'cancel',
                        handler: () => {
                            return resolve(false);
                        },
                    },
                    {
                        text: 'Có',
                        handler: () => {
                            return resolve(true);
                        },
                    },
                ],
            });

            await confirm.present();
        });
    }

    async openDialogResponse(data: BaseOutModel) {
        var msg;
        this.translate.get('RESPONSE_MSG.M00').subscribe(val => {
            msg = val;
        });
        return new Promise(async (resolve) => {
            if (data.statusCode == '00') {
                const confirm = await this._alert.create({
                    message: msg,//data.message,
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                                return resolve(true);
                            },
                        },
                    ],
                });
                await confirm.present();
            } else {
                //const confirm = await this._alert.create({
                //    message: data.Message,
                //    buttons: [
                //        {
                //            text: 'Ok',
                //            handler: () => {
                //                return resolve(false);
                //            },
                //        },
                //    ],
                //});
                return resolve(false);


            }
        });
    }
}