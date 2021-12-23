import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() label: string;
  @Input() model: string;
  @Output() modelChange = new EventEmitter();
  @Input() required: boolean
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

  onModelChanged(e){
    this.model = e;
    this.modelChange.emit(this.model);
  }

}
