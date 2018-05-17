/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';
import { NakamaAuthProvider } from './auth/providers/nakama-auth-provider';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { NakamaClientService } from './nakama-client.service';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { NakamaAuthProvider1 } from './auth/providers/nakama-auth-provider1';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NakamaAuthProvider,
          config: {
            baseEndpoint: 'http://127.0.0.1:7350',
            login: {
              alwaysFail: false,
              rememberMe: true,
              endpoint: '/v2/account/authenticate/email?create=false',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Login/Email combination is not correct, please try again.'],
              defaultMessages: ['You have been successfully logged in.'],
            },
            register: {
              alwaysFail: false,
              rememberMe: true,
              endpoint: '/v2/account/authenticate/email?create=true',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['You have been successfully registered.'],
            },
            logout: {
              alwaysFail: false,
              endpoint: '/api/auth/logout',
              method: 'delete',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['You have been successfully logged out.'],
            },
            requestPass: {
              endpoint: '/api/auth/request-pass',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Reset password instructions have been sent to your email.'],
            },
            resetPass: {
              endpoint: '/api/auth/reset-pass',
              method: 'put',
              redirect: {
                success: '/',
                failure: null,
              },
              resetPasswordTokenKey: 'reset_password_token',
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Your password has been successfully changed.'],
            },
            refreshToken: {
              endpoint: '/api/auth/refresh-token',
              method: 'post',
              redirect: {
                success: null,
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Your token has been successfully refreshed.'],
            },
            token: {
              key: 'token',
              getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
                this.getConfigValue('token')),
            },
            errors: {
              key: 'data.errors',
              getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
                this.getConfigValue('errors.key'),
                this.getConfigValue(`${module}.defaultErrors`)),
            },
            messages: {
              key: 'data.messages',
              getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
                this.getConfigValue('messages.key'),
                this.getConfigValue(`${module}.defaultMessages`)),
            },
          },
        },
      },
      forms: {},
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    AuthGuard,
    NakamaClientService,
  ],
})
export class AppModule {
}
