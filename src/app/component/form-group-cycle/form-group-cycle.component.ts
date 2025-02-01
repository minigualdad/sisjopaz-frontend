import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupCycleService } from '../../service/group-cycle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-group-cycle',
  standalone:false,
  templateUrl: './form-group-cycle.component.html',
  styleUrl: './form-group-cycle.component.scss'
})
export class FormGroupCycleComponent {
  @Output() periodsEmitted = new EventEmitter<any[]>();
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private _groupCycleService: GroupCycleService) {
    this.form = this.fb.group({
      groupId: ['', Validators.required],
    });
  }

  onSubmit() {
    const groupIdValue = this.form.get('groupId')?.value;
    this._groupCycleService.getPeriodsByGroupId(groupIdValue).subscribe({
      next: (response: any) => {
        if(response.groupCycle <= 0){
          this.errorMessage = 'Por favor ingrese un Id de grupo válido.';
        }else{
          const periods = response.groupCycle.map((item: { period: any }) => item.period);
          this.periodsEmitted.emit(periods);
        }
      },
      error: (err) => {
        console.error('Error fetching periods:', err);
      }
    });
  }
}
