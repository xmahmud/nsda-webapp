import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { SubscribableComponent } from "../../utility/subscribable.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SubscribableComponent implements OnInit {
  model: UserLoginModel = new UserLoginModel();

  constructor(
    private userService: UserService,
    private router: Router

    )
   {
    super();
  }

  ngOnInit(): void {
  }

  onPassChange(e) {
    this.model.password = e;
  }

  onNameChange(e){
    this.model.email = e;
  }

  login() {
    this.subscribe(this.userService.login(this.model), success => {
      if(success){
        this.userService.setUserInfo(success);
        this.router.navigateByUrl('');
      }

      

    })
  }
}

export class UserLoginModel {
  password: string = '';
  email: string = '';
  rememberMe: boolean = false
}
