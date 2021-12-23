import { Injectable } from "@angular/core";
import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent
} from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable()
export class BroadcastService {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .pipe(filter(event => event.key === key))
      .pipe(map(event => <T>event.data));
  }
}

interface BroadcastEvent {
  key: any;
  data?: any;
}
