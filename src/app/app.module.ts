/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Globals } from './pages/globals';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
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
              endpoint: '/v2/account/authenticate/email',
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
                failure: '/',
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
  providers: [ Globals ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
