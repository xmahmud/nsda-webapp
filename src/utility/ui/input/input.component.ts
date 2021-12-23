import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"]
})
export class InputComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() model: string;
  @Output() modelChange = new EventEmitter();
  @Input() name: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() error: any;
  

  errorMessage: string;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.error) {
      if (this.error && this.error.error && this.error.error.errors && this.error.error.errors[this.name]) {
        this.errorMessage = this.error.error.errors[this.name][0];
      }
    }
  }

  onModelChanged(e){
    this.clearError();
    this.model = e;
    this.modelChange.emit(this.model);
  }

  clearError() {
    this.errorMessage = null;
  }
  
}
