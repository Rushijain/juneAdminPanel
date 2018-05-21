import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, from, of as observableOf, observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NbAbstractAuthProvider } from '@nebular/auth/providers/abstract-auth.provider';
import { NbDummyAuthProvider, NbEmailPassAuthProvider } from '@nebular/auth';
import { NbAuthResult } from '@nebular/auth/services/auth-result';
import { Client } from '@heroiclabs/nakama-js';
import { NakamaClientService } from '../../nakama-client.service';
import { Session } from 'selenium-webdriver';
import { nbThemeOptionsToken } from '@nebular/theme';
// import 'rxjs/add/observable/fromPromise';
import { NbTokenService } from '@nebular/auth/services/token/token.service';

@Injectable({
    providedIn: 'root'
})
export class NakamaAuthProvider extends NbAbstractAuthProvider {

    public nakamaService: NakamaClientService;
    public _session: Session;
    public tokenService: NbTokenService;

    constructor(nk: NakamaClientService, ts: NbTokenService) {
        super();
        this.nakamaService = nk;
        this.tokenService = ts;
    }

    public authenticate(data?: any): Observable<NbAuthResult> {

        return Observable.create(observer => {
            this.nakamaService.restoreSessionOrAuthenticate(data.email, data.password).then((session) => {
                if (session != null) {
                    var res = JSON.stringify(session);
                    observer.next(new NbAuthResult(true, this.createSuccessResponse(session), this.getConfigValue('login.redirect.success'),
                        ['Successfully logged in.'], this.getConfigValue('login.defaultMessages'), res));
                } else {
                    observer.next(this.createFailResult(session));
                }
            }).catch(((e) => {
                console.log("An error occured: %o", e);
                observer.next(this.createFailResult(e));
            }));
        });
    }

    public register(data?: any): Observable<NbAuthResult> {
        return Observable.create(observer => {
            this.nakamaService.restoreSessionOrAuthenticate(data.email, data.password).then((session) => {
                var res = JSON.stringify(session);
                observer.next(new NbAuthResult(true, this.createSuccessResponse(session), this.getConfigValue('login.redirect.success'),
                    ['Successfully logged in.'], this.getConfigValue('login.defaultMessages'), res));
            }).catch(((e) => {
                console.log("An error occured: %o", e);
                observer.next(observableOf(this.createFailResult(e)));
            }));
        });
    };
    public requestPassword(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getConfigValue('delay')));
    };
    public resetPassword(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getConfigValue('delay')));
    };
    public logout() {
        return Observable.create(observer => {
            observer.next(new NbAuthResult(true, '', this.getConfigValue('logout.redirect.success'), [], this.getConfigValue('logout.defaultMessages')));
        });
    };
    public refreshToken() {
        return observableOf(this.createDummyResult("test"))
            .pipe(delay(this.getConfigValue('delay')));
    };

    public createDummyResult(data) {
        if (this.getConfigValue('alwaysFail')) {
            // TODO we dont call tokenService clear during logout in case result is not success
            return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
        }
        // TODO is it missed messages here, is it token should be defined
        return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
    };

    public createSuccessResult(data) {
        console.log("Success Result:- " + data);
        return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
    };

    public createFailResult(data) {
        console.log("Fail Result:- " + data);
        // new NbAuthResult(false, data, this.getConfigValue('resetPass.redirect.failure'), ['Something went wrong.']);
        return new NbAuthResult(false, data, this.getConfigValue('resetPass.redirect.failure'), this.getConfigValue('login.defaultErrors'));
    }

    public createSuccessResponse(data) {
        return new HttpResponse({ body: { data }, status: 200 });
    };
}
