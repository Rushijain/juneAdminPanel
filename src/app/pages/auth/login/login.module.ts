import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class LoginModule implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
    console.log(this.router.url);
    console.log(this.authService.isAuthenticated());
  }
  canActivate() {
    console.log(this.router.url);
    return true;/* this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          } else if (this.router.url === '/auth/login') {
            console.log(this.router.url);
          }
          console.log(this.router.url);
        })

      );*/
  }
}
