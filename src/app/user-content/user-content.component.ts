import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { SubscribableComponent } from 'src/utility/subscribable.component';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent extends SubscribableComponent implements OnInit {

  model: any;

  constructor(
    private userService: UserService,
    private router: Router

    )
   {
    super();

    this.subscribe(this.userService.getInfo(this.userService.getUserInfo().id), success => {
      this.model = success;
    });

  }

  ngOnInit(): void {
  }

}
