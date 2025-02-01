import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-selected',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './selected.component.html',
    styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit, OnDestroy {

  @Output() submit = new EventEmitter<string>();
  @Input() title: string = '';
  @Input() array: any[] = [];
  @Input() reset: boolean = false;
  timeout = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedOption: ['', Validators.required]
    });
    setTimeout(() => {
      this.timeout = true;
    }, 30000)
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if(changes.reset) {
      this.form.reset();
    }
  }

  setValue(event: any) {
    this.form.get('selectedOption')?.setValue(event?.target?.value)
    this.submit.emit(this.form.value.selectedOption);
  }
    
  ngOnDestroy(): void {
  }
}
