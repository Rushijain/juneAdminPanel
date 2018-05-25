import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    if (this.router.url === '/auth/login') {
      return false;
    } else {
      console.log(this.router.url);
      return this.authService.isAuthenticated()
        .pipe(
          tap(authenticated => {
            if (!authenticated) {
              this.router.navigate(['auth/login']);
            } else if (this.router.url === '/auth/login') {
              console.log(this.router.url);
            }
            console.log(this.router.url);
          })

        );
    }
  }
}
