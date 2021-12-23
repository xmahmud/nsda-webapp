import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class CanActivateOpenPagesGuard implements CanActivate {
    constructor(
        private authService: UserService,
        private router: Router
    ) {

    }

    canActivate(): boolean {

        if(this.shouldForceLogout()) {
          this.authService.logout();
          return true;
        }

        if (this.authService.isLoggedIn()) {
             this.router.navigateByUrl('');
           
            return false;
        }
        return true;
    }

    shouldForceLogout() {

      let url = window.location.href.replace(window.location.origin, '');
      // let hasSecretCode = !!queryStringValue(url, 'sc');

      let forceLogoutUrls = ['forget-password', 'reset-password', 'verify'];
      if(forceLogoutUrls.some(x=> url.includes(x))) {
        return true;
      }
      return false;
    }

}
