import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-digit',
  templateUrl: './input-digit.component.html',
  styleUrls: ['./input-digit.component.scss']
})
export class InputDigitComponent implements OnInit {

  @Input() model: string;
  @Output() modelChange = new EventEmitter();
  @Input() name: string;
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
