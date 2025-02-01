import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-selector',
  standalone: false,
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.scss'
})
export class TimeSelectorComponent {
  @Output() timeListen: EventEmitter<any> = new EventEmitter();
  @Input() hour!: number;
  @Input() minute!: number;
  form: FormGroup;
  dateTimeISO: any;
  hours = Array.from({ length: 24 }, (_, i) =>
      i < 10 ? '0' + i : i.toString()
  );
  minutes = Array.from({ length: 60 }, (_, i) =>
      i < 10 ? '0' + i : i.toString()
  );

  constructor() {
      this.form = new FormGroup({
          hour: new FormControl('', [Validators.required]),
          minute: new FormControl('', [Validators.required]),
      });
  }

  async ngAfterContentInit() {

      setTimeout(() => {
          if (this.hour) {
              this.form.patchValue({ hour: this.hour });
          }
          if (this.minute) {
              this.form.patchValue({ minute: this.minute });
          }
      }, 500);
  }

  saveDateTime() {
      let time : any;
      let hour: any;
      let minutes: any;

      hour = this.form.get('hour')?.value;
      minutes = this.form.get('minute')?.value;
      time = hour + ':' + minutes
      this.timeListen.emit(time);
  }

}
