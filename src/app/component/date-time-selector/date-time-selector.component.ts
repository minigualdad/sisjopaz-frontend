import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-date-time-selector',
    templateUrl: './date-time-selector.component.html',
    styleUrls: ['./date-time-selector.component.scss'],
    standalone: false
})
export class DateTimeSelectorComponent {
  form: FormGroup;
  @Output() dateTimeListen: EventEmitter<any> = new EventEmitter();
  @Input() date!: Date;
  @Input() title: string = '';

  dateSelected!: Date;
  dateTimeISO: any;
  constructor() {

  this.form = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });
 
}

 async ngAfterContentInit() {

}

async saveDateTime(event: any) {
  let dateTime = new Date(this.dateSelected);  
  this.dateTimeISO = dateTime.toISOString();
  this.dateTimeListen.emit(this.dateTimeISO);
}


selectDateTimeId() {
  this.dateTimeListen.emit(this.dateTimeISO);
}

}
