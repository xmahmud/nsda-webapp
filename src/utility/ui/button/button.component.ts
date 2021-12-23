import { Component, OnInit, Input, Directive } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  @Input() klass: string;
  @Input() loading: false;

  constructor() {}

  ngOnInit() {}
}
