 /// <reference types="@types/googlemaps" />
import { Plugins } from '@capacitor/core';

import { Component, Input, Renderer2, ElementRef, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
//const { Geolocation, Network } = Plugins;
import { Observable } from 'rxjs';
import { DeviceInfo } from 'src/app/models/login-out.model';
//declare var google;

@Component({
    selector: 'google-map',
    templateUrl: 'google-map.component.html'
})
export class GoogleMapComponent implements OnInit {

    @Input('apiKey') apiKey: string;
    @Input() devices$: Observable<DeviceInfo[]>;
    @Output() selected = new EventEmitter<DeviceInfo>();
    public map: any;
    public markers: any[] = [];
    private mapsLoaded: boolean = false;
    private networkHandler = null;
    geocoder: any;
    constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document) {

    }

    ngOnInit() {

        this.init().then((res) => {
            console.log("Google Maps ready.");
            this.devices$.subscribe(val => {
                if (val) {
                    for (var i = 0; i < val.length; i++) {
                        console.log(val[i])
                        if (val[i].longitude && val[i].latitude) {
                            this.addMarker(val[i]);
                        }
                    }
                }
              //  this.codeAddress('Ba ria vung tau');

               
            })
        }, (err) => {
            console.log(err);
        });

    }

    private init(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loadSDK().then((res) => {

                this.initMap().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });

            }, (err) => {

                reject(err);

            });

        });

    }

    private loadSDK(): Promise<any> {

        console.log("Loading Google Maps SDK");

        return new Promise((resolve, reject) => {

            if (!this.mapsLoaded) {
                this.injectSDK().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });
                //Network.getStatus().then((status) => {

                //    if (status.connected) {

                //        this.injectSDK().then((res) => {
                //            resolve(true);
                //        }, (err) => {
                //            reject(err);
                //        });

                //    } else {

                //        if (this.networkHandler == null) {

                //            this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                //                if (status.connected) {

                //                    this.networkHandler.remove();

                //                    this.init().then((res) => {
                //                        console.log("Google Maps ready.")
                //                    }, (err) => {
                //                        console.log(err);
                //                    });

                //                }

                //            });

                //        }

                //        reject('Not online');
                //    }

                //}, (err) => {

                //    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                //    if (navigator.onLine) {

                //        this.injectSDK().then((res) => {
                //            resolve(true);
                //        }, (err) => {
                //            reject(err);
                //        });

                //    } else {
                //        reject('Not online');
                //    }

                //});

            } else {
                reject('SDK already loaded');
            }

        });


    }

    private injectSDK(): Promise<any> {

        return new Promise((resolve, reject) => {

            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            }

            let script = this.renderer.createElement('script');
            script.id = 'googleMaps';

            if (this.apiKey) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
                script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
            }

            this.renderer.appendChild(this._document.body, script);

        });

    }

    private initMap(): Promise<any> {

        return new Promise((resolve, reject) => {

            //Geolocation.getCurrentPosition().then((position) => {

            //    console.log(position);
                
            //    //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //    let latLng = new google.maps.LatLng(14.058324, 108.277199);

            //    let mapOptions = {
            //        center: latLng,
            //        zoom: 2,
            //        //mapTypeControl: false,
            //        disableDefaultUI: true
            //    };

            //    this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
            //    resolve(true);

            //}, (err) => {

            //    reject('Could not initialise map');

            //});
            //this.geocoder = new google.maps.Geocoder();
            //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let latLng = new google.maps.LatLng(14.058324, 108.277199);

            let mapOptions = {
                center: latLng,
                zoom: 2,
                //mapTypeControl: false,
                disableDefaultUI: true
            };

            this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
            resolve(true);

        });

    }

    public addMarker(item: DeviceInfo): void {
        var lat = +item.latitude;
        var long = +item.longitude;
        let latLng = new google.maps.LatLng(lat + Math.random(), long + Math.random());

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon: './assets/icon/marker2.png'
        });

        marker.addListener("click", (e) => {
            console.log(item);
            this.selected.emit(item);
        });

        this.markers.push(marker);

        
    }
    //public codeAddress(address) {
    //    this.geocoder.geocode({ 'address': address }, (results, status) => {
    //        console.log(results);
    //        var latLng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
    //        console.log(latLng);
    //        if (status == 'OK') {
    //            var marker = new google.maps.Marker({
    //                animation: google.maps.Animation.DROP,
    //                position: latLng,
    //                icon: './assets/icon/marker2.png',
    //                map: this.map
    //            });
    //           // console.log(map);
    //            this.markers.push(marker);
    //        } else {
    //            alert('Geocode was not successful for the following reason: ' + status);
    //        }
    //    });
    //}
}