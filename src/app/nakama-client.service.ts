import { Injectable } from '@angular/core';
import * as Nakama from '@heroiclabs/nakama-js';
import { NbTokenLocalStorage } from '@nebular/auth';
import {} from '@nebular/auth/helpers'

@Injectable({
  providedIn: 'root'
})
export class NakamaClientService {

  readonly client: Nakama.Client;
  currentSession = null;

  constructor() {
    this.client = new Nakama.Client("gsg@123#", "127.0.0.1", "7350");
  }

  public async restoreSessionOrAuthenticate(email: string, password: string): Promise<any> {
    var session = null;

    try {
      var sessionString = await this.client.authenticateEmail({ email: email, password: password });
      if (sessionString && sessionString.token != "") {
        session = Nakama.Session.restore(sessionString.token);
        var currentTimeInSec = new Date().getMilliseconds() / 1000;
        if (!session.isexpired(currentTimeInSec)) {
          return Promise.resolve(session);
        }
      } else {
        session = await this.client.authenticateEmail({ email: email, password: password });

      }

      return Promise.resolve(session);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
