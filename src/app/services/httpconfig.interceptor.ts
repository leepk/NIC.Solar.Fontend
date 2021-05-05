import { Injectable, Component, Inject } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,

    HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, timer} from 'rxjs';
import {
    map, catchError, tap, timeout, retry, retryWhen,
    mergeMap, take, concat, delay, finalize, concatMap
} from 'rxjs/operators';
import * as ApiConst from './api.const'
import { BaseOutModel } from '../models/base-out.model';
import { ErrorDialogUtils } from '../shared/utils/error-dialog.utils';
export var isChanged = false;
export const genericRetryStrategy = ({
        maxRetryAttempts = 3,
        scalingDuration = 200,
        excludedStatusCodes = [500, 404]
    }: {
        maxRetryAttempts?: number,
        scalingDuration?: number,
        excludedStatusCodes?: number[]
    } = {}) => (attempts: Observable<any>) => {
        return attempts.pipe(
            mergeMap((error, i) => {
                const retryAttempt = i + 1;
                // if maximum number of retries have been met
                // or response is a status code we don't wish to retry, throw error
                if (error.status === 401) {
                    return throwError(error);
                }

                if (
                    retryAttempt > maxRetryAttempts ||
                    excludedStatusCodes.find(e => e === error.status)
                ) {
                    isChanged = true;
                    return throwError(error);
                }

                console.log(
                    `Attempt ${retryAttempt}: retrying in ${retryAttempt *
                    scalingDuration}ms`
                );
                // retry after 1s, 2s, etc...
                return timer(retryAttempt * scalingDuration);
            }),
            finalize(() => console.log('We are done!'))
        );
    };
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public http: HttpClient, private router: Router, public errorDialog: ErrorDialogUtils) {
        console.log('HttpConfigInterceptor constructor');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //if (isChanged && ApiConst.ApiUrl.HOST2 != null && ApiConst.ApiUrl.HOST2 != undefined) {
        //    var _url = request.url.replace(ApiConst.ApiUrl.HOST, ApiConst.ApiUrl.HOST2);
        //    request = request.clone({ url: _url });
        //}
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8')});
        }

        const token: string = localStorage.getItem('token');
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8'), withCredentials: false });
        }
        //request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        console.log('HttpConfigInterceptor', request);
        return next.handle(request).pipe(
            timeout(15000),
            retryWhen(genericRetryStrategy()),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    if (event.body) {
                        var body = event.body as BaseOutModel;

                        if (body.statusCode != null && body.statusCode != undefined && body.statusCode != '00') {
                            this.errorDialog.openDialogOK(body.message);
                        }
                    }
                    if (event.status == 204) {
                        throwError('This request has failed ' + event.status)
                    } else if (event.status != 200) {
                        //this.store.dispatch(new fromAppAction.AddError(`Xảy ra lỗi ${event.status}`));
                        throwError('This request has failed ' + event.status)
                    }
                    
                }
                
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('HttpConfigInterceptor catchError', error);

                
                if (error.status == 401) {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('/login')
                } else if (error.status == 409) {

                } else if (error.status == 0) { //timeout?
                } else {
                    // this.store.dispatch(new fromAppAction.AddError(error.error));
                    if (error.error == undefined) {
                    } else {
                    }
                }         
                return throwError(error);
            }),
            finalize (() => { console.log('[debug] funally'); })
        )
    }

}
