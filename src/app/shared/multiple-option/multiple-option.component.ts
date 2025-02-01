import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiple-option',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './multiple-option.component.html',
  styleUrl: './multiple-option.component.scss'
})
export class MultipleOptionComponent implements OnChanges {

  @Output() submit = new EventEmitter<any[]>();
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() required: boolean = true;
  @Input() options: any[] = [{key: '', value: ''}];
  @Input() reset: boolean = false;

  form: FormGroup;
  timeout = false;
  selectedValues: any[] = [];

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

  click(event: any, option: any) {
    if(event.target.checked) {
      this.selectedValues.push(option.key);
    } else {
      this.selectedValues = this.selectedValues.filter( selected => {
        return selected != option.key;
      })
    }
    if(this.selectedValues.length == 0) {
      this.form.get('selectedOption')?.setValue('');
    }
    this.submit.emit(this.selectedValues);
  }

}
