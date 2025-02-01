import { CommonModule } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-unique-option',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './unique-option.component.html',
    styleUrls: ['./unique-option.component.scss']
})
export class UniqueOptionComponent implements OnChanges {

  @Output() submit = new EventEmitter<string>();
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() required: boolean = true;
  @Input() options: any[] = [{key: '', value: ''}];
  @Input() reset: boolean = false;

  form: FormGroup;
  timeout = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedOption: ['', Validators.required]
    });
    setTimeout( () => {
      this.timeout = true;
    }, 30000);
  }

  ngOnChanges(changes: any) {
    if (changes.required) {
      const validators = this.required ? [Validators.required] : [];
      this.form.get('selectedOption')?.setValidators(validators);
      this.form.get('selectedOption')?.updateValueAndValidity();
    }
    if(changes.reset) {
      this.form.reset();
    }
  }

  click(event: any) {
    // this.form.get('selectedOption')!.setValue(event.srcElement.value);
    // this.submit.emit(this.form.get('selectedOption')?.value);
    this.submit.emit(event);
  }

}
