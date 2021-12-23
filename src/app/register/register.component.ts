import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/services/user.service';
import { SubscribableComponent } from 'src/utility/subscribable.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends SubscribableComponent implements OnInit {
  model: UserLoginModel = new UserLoginModel();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
  }

  register() {
    this.subscribe(this.userService.signup(this.model), success => {
      if((<boolean>success)){
        this.router.navigateByUrl('login');
      }

      

    })
  }

}

export class UserLoginModel {
  password: string = '';
  email: string = '';
  name: string = '';
  phone: string = '';

}

