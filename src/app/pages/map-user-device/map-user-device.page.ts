import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AcountInfo } from 'src/app/models/account-info-out.model';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { ErrorDialogUtils } from 'src/app/shared/utils/error-dialog.utils';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { DeviceUserInModel } from 'src/app/models/device-in.model';

@Component({
  selector: 'app-map-user-device',
  templateUrl: './map-user-device.page.html',
  styleUrls: ['./map-user-device.page.scss'],
})
export class MapUserDevicePage implements OnInit {

    deviceId: string;
    text: any;
    constructor(private userService: UsersService, private deviceService: DevicesService, private route: ActivatedRoute,
        private dialog: ErrorDialogUtils, private translate: TranslateService) {
        this.deviceId = this.route.snapshot.paramMap.get('id');
    }

    mappedAccountList = Array<AcountInfo>();
    filteredAccountList = Array<AcountInfo>();
    ngOnInit() {
        this.translate.get('MAP_USER').subscribe(val => {
            this.text = val;
        })
        this.initListAccount();
    }
    initListAccount() {
        combineLatest(this.userService.getListAccount(), this.deviceService.getListAccountDevice(this.deviceId))
            .subscribe(results => {
                this.mappedAccountList = [];
            // results[0] is our character
            // results[1] is our character homeworld
            //results[0].homeworld = results[1];
            //this.loadedCharacter = results[0];
                console.log(results);
                var acclist = results[0].acounts;
                var accDeviceList = results[1];
                for (var i = 0; i < acclist.length; i++) {
                    var check = false;
                    for (var y = 0; y < accDeviceList.length; y++) {
                        if (accDeviceList[y].acountName == acclist[i].acountname) {
                            check = true;
                            break;
                        }
                    }
                    if (!check) {
                        this.mappedAccountList.push(acclist[i])
                    }
                }
                this.filteredAccountList = this.mappedAccountList;
                console.log('this.mappedAccountList', this.mappedAccountList);
        });
    }
    search(event) {
        var searchString = event.detail.value.toLowerCase()
        if (event.detail.value == '' || event.detail.value == null || event.detail.value == undefined) {
            this.filteredAccountList = this.mappedAccountList;
        } else {
            this.filteredAccountList = this.mappedAccountList
                .filter(item => {
                    if (item.acountname.toLowerCase().includes(searchString)
                        || (item.email && item.email.includes(searchString))
                        || (item.fullName && item.fullName.includes(searchString))
                        || (item.phone && item.phone.includes(searchString))) {
                        return item
                    }
                });
        }
    }

    alert(account: AcountInfo) {
        this.translate.get('MAP_USER.WARNING_MSG', {
            username: account.acountname,
            device: this.deviceId
        }).subscribe(val => {
            this.dialog.warn(val).then(rs => {
                if (rs) {
                    this.mapUser(account);
                }
            })

        })
    }

    mapUser(account: AcountInfo) {
        var prm = <DeviceUserInModel>{
            acountname: account.acountname,
            deviceId: this.deviceId
        }
        this.deviceService.mapUserToDevice(prm).subscribe(val => {
            this.dialog.openDialogResponse(val).then(rs => {
                if (rs) {
                    this.initListAccount();
                }
            })
        })
    }
}
