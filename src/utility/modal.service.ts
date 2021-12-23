import { BroadcastService } from './broadcast.service';
import { Injectable } from "@angular/core";
declare var $: any;
@Injectable()
export class ModalService {

  constructor(private broadcastService : BroadcastService){

  }

  show(id) {
    this.broadcastService.broadcast(id);
    $(id).modal("show");
  }
  hide(id) {
    $(id).modal("hide");
  }
}
