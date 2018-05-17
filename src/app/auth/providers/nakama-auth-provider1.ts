import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NbAbstractAuthProvider } from '@nebular/auth/providers/abstract-auth.provider';
import { NbDummyAuthProvider, NbEmailPassAuthProvider, NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { NbAuthResult } from '@nebular/auth/services/auth-result';
import { Client } from '@heroiclabs/nakama-js';
import { NakamaClientService } from '../../nakama-client.service';

export interface UserData {
    username: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface AuthConfig {
    apiAddress: string;
}

@Injectable({
    providedIn: 'root'
})
export class NakamaAuthProvider1 extends NbAbstractAuthProvider {
    protected defaultConfig: AuthConfig = {
        apiAddress: 'http://example.com/accesstoken',
    };
    protected config: AuthConfig;

    constructor(private httpClient: HttpClient) {
        super();
    }

    logout(): Observable<NbAuthResult> {
        throw new Error('Method not implemented.');
        // return this.authService.logout('name');
        // return Observable.of(new NbAuthResult(
        //     true,
        //     {},
        //     '/',
        //     false,
        //     'Sign out success.',
        // ));
    }

    authenticate(user: UserData): Observable<NbAuthResult> {
        const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const body = `grant_type=password&username=${user.username}&password=${user.password}`;

        return observableOf(new NbAuthResult(false, this.createSuccessResponse("test"), this.getConfigValue('login.redirect.failure'), ['Something went wrong.']));
    }

    getConfigValue(key: string) {
        return this.config[key];
    }
    register(data?: UserData): Observable<NbAuthResult> {
        throw new Error('Method not implemented.');
    }
    requestPassword(data?: UserData): Observable<NbAuthResult> {
        throw new Error('Method not implemented.');
    }
    resetPassword(data?: UserData): Observable<NbAuthResult> {
        throw new Error('Method not implemented.');
    }

    refreshToken(data?: UserData): Observable<NbAuthResult> {
        throw new Error('Method not implemented.');
    }
}