import { UserService } from "./../services/user.service";
import { BroadcastService } from "./broadcast.service";
import { Subscription, Observable } from "rxjs";
import { Component, OnDestroy } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";
import { SubscribableService } from "./subscribable.service";

@Component({
  template: ''
})
export class SubscribableComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor() {}

  protected subscribe<T>(
    observable: Observable<T>,
    success?: (value: T) => void,
    error?: (error: any) => void
  ) {
    const s = observable.subscribe(
      _success => {
        success(_success);
      },
      _error => {
        if (error) {
          error(_error);
        }
      }
    );    
    this.subscriptions.push(s);
    
  }

  protected unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => {
        s.unsubscribe();
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
