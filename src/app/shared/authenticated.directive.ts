import { Directive, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Directive({
  selector: '[authenticated]'
})
export class AuthenticatedDirective implements OnDestroy  {

  private sub: any = null;

  constructor(
    private authService: UserService,
    private router: Router) {

    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
  }

  ngOnDestroy() {
    if (this.sub != null) {
        this.sub.unsubscribe();
    }
}

}
