import { Component, OnInit, OnDestroy } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
import Quagga from '@ericblade/quagga2'; // ES6

@Component({
  selector: 'app-code-scanner',
  templateUrl: './code-scanner.page.html',
  styleUrls: ['./code-scanner.page.scss'],
})
export class CodeScannerPage implements OnInit, OnDestroy {

    constructor(private qrScanner: QRScanner, private toastCtrl: ToastController) { }

    ngOnInit() {
        this.scanBarcode();
    }
    scanSubscription;
    scanBarcode() {
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
            },
            decoder: {
                readers: ['ean_reader']
            }
        }, function (error) {
            if (error) {
                console.log(error);
            }
            console.log('Initialization finished. Ready to start');
            Quagga.start();
        });
        Quagga.onDetected(data => {
            console.log(data);
        });
    }
    scan() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    console.log(11111);
                    this.qrScanner.show();
                    this.scanSubscription = this.qrScanner.scan().subscribe((text: string) => {
                        console.log(text)
                    });
                } else {
                    console.error('Permission Denied', status);
                }
            })
            .catch((e: any) => {
                console.error('Error', e);
            });
    }

    stopScanning() {
        (this.scanSubscription) ? this.scanSubscription.unsubscribe() : null;
        this.scanSubscription = null;
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
        this.qrScanner.hide();
        this.qrScanner.destroy();
    }

    ngOnDestroy() {
        this.stopScanning();
        Quagga.stop();
    }
    qrScan() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // camera permission was granted
                    console.log(1111111111111);
                    this.qrScanner.show();
                    // start scanning
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        console.log('Scanned something', text);

                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                    });

                } else if (status.denied) {
                    console.log('status.denied');
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    console.log('but not permanently');

                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }
}
