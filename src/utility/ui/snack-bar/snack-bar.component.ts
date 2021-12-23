import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-snack-bar",
  templateUrl: "./snack-bar.component.html",
  styleUrls: ["./snack-bar.component.scss"]
})
export class SnackBarComponent implements OnInit {
  data: any;

  constructor() {}

  ngOnInit() {
    // //
    // setTimeout(() => {
    //   this.close();
    // }, 3000);
  }

  close() {    
    if (this["close"]) {
      this["close"]();
    }
  }

  public onClose(listener: Function) {
    if (!this["onCloseListener"]) {
      this["onCloseListener"] = [];
    }
    this["onCloseListener"].push(listener);
  }
}
