import { Injectable } from '@angular/core';
import * as Nakama from '@heroiclabs/nakama-js';
import { NbTokenLocalStorage } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class NakamaClientService {

  readonly client: Nakama.Client;
  currentSession = null;

  constructor() {
    this.client = new Nakama.Client("defaultkey", "127.0.0.1", "7350");
  }

  public async restoreSessionOrAuthenticate(email: string, password: string): Promise<any> {
    var session = null;

    try {
      var sessionString = await this.client.authenticateEmail({ email: email, password: password });
      console.log(sessionString);
      if (sessionString && sessionString.token != "") {
        session = Nakama.Session.restore(sessionString.token);
        var currentTimeInSec = new Date().getMilliseconds() / 1000;
        if (!session.isexpired(currentTimeInSec)) {
          console.log("Restored session. User ID: %o", session.user_id);
          return Promise.resolve(session);
        }
      } else {
        session = await this.client.authenticateEmail({ email: email, password: password });
        this.storeSession(session);

      }
      console.log("Authenticated successfully. User ID: %o", session.user_id);

      return Promise.resolve(session);
    } catch (e) {
      console.log("An error occured while trying to restore session or authenticate user: %o", e)
    }
    return session;
  }

  public storeSession(session) {
    console.log("session:" + session)
    //TODO
  }
}
