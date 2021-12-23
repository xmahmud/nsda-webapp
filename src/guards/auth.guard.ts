import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: UserService,
        private router: Router
    ) {

    }

    canActivate(): boolean { 
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    }

}