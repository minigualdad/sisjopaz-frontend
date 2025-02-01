import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent {
  form: FormGroup;
  subscription: Subscription | undefined;
  age = 0;
  ageBoolen = this.age != 0;
  @Input() required = true;
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Output() submit = new EventEmitter<any>();
  @Input() reset: boolean = false;
  timeout = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      inputValue: ['']
    });
    setTimeout(() => {
      this.timeout = true;
      if(this.required) {
        this.form.get('inputValue')?.setValidators(Validators.required);
        this.form.get('inputValue')?.updateValueAndValidity();
      }
    }, 30000);
  }

  ngOnChanges(changes: any) {
    if(changes.reset) {
      this.form.reset();
    }
  }

  onSubmit(event: any) {
      this.submit.emit(this.form.value.inputValue);
  }

  // // Detecta clics fuera del componente
  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: Event) {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('.input-container')) {
  //     this.onSubmit();
  //   }
  // }
}
