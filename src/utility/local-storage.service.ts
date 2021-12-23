import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

@Injectable()
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  set(key, value) {
    this.storage.set(key, value);
  }

  get(key) {
    return this.storage.get(key);
  }

  remove(key) {
    this.storage.remove(key);
  }
}
