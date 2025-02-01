import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-department-selector',
  standalone: false,
  templateUrl: './department-selector.component.html',
  styleUrl: './department-selector.component.scss'
})
export class DepartmentSelectorComponent {
  form: FormGroup;
  departments: any = [];
  @Output() departmentIdListen: EventEmitter<number> = new EventEmitter();
  @Input() department?: number;

  constructor(
    private departmentService: DepartmentService,
  ) {

    this.form = new FormGroup({
      departmentId: new FormControl('', [Validators.required]),
    });


    this.departmentService.getAll()
      .subscribe({
        next: (response: any) => {
          this.departments = response.departments;
          if (this.department) {
            this.form.patchValue({ departmentId: this.department });
          }
        }
      });
  }
  ngOnInit() {
    this.checkValue();

  }

  ngAfterContentInit() {
  }

  checkValue() {
    setTimeout(() => {
      if (this.department) {
        this.form.patchValue({ departmentId: this.department });
      }
    }, 300);

  }

  selectDepartmentId(event: any) {
    this.departmentIdListen.emit(event.value);
  }
}
