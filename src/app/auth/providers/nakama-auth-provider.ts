import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NbAbstractAuthProvider } from '@nebular/auth/providers/abstract-auth.provider';
import { NbDummyAuthProvider, NbEmailPassAuthProvider } from '@nebular/auth';
import { NbAuthResult } from '@nebular/auth/services/auth-result';
import { Client } from '@heroiclabs/nakama-js';
import { NakamaClientService } from '../../nakama-client.service';
import { Session } from 'selenium-webdriver';

@Injectable({
    providedIn: 'root'
})
export class NakamaAuthProvider extends NbAbstractAuthProvider {

    public nakamaService: NakamaClientService;
    public _session: Session;

    constructor(nk: NakamaClientService) {
        super();
        this.nakamaService = nk
    }

    public authenticate(data?: any): Observable<NbAuthResult> {

        this.nakamaService.restoreSessionOrAuthenticate(data.email, data.password).then((session) => {
            return observableOf(this.createSuccessResult(data));
        }).catch(((e) => {
            console.log("An error occured: %o", e);
            return observableOf(this.createFailResponse(e));
        }));
        return observableOf(this.createSuccessResult(data));
    }

    public register(data) {
        this.nakamaService.restoreSessionOrAuthenticate(data.email, data.password).then(function (session) {
            return this.nakamaService.client.writeStorageObjects(session.token, [{
                "collection": "collection",
                "key": "key1",
                "value": { "jsonKey": "jsonValue" }
            }]);
        }).then(function (writeAck) {
            console.log("Storage write was successful - ack: %o", writeAck);
            return observableOf(this.createSuccessResult(data));
        }).catch(function (e) {
            console.log("An error occured: %o", e);
            return observableOf(this.createSuccessResult(data));
        });
        return observableOf(this.createSuccessResult(data));
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
        return observableOf(this.createDummyResult(null))
            .pipe(delay(this.getConfigValue('delay')));
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
        return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
    }
}
