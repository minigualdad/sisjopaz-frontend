import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assistance-beneficiaries-date-selector',
  standalone: false,
  templateUrl: './assistance-beneficiaries-date-selector.component.html',
  styleUrl: './assistance-beneficiaries-date-selector.component.scss'
})
export class AssistanceBeneficiariesDateSelectorComponent {
  @Input() assistanceDateStart: any;
  @Input() assistanceDateEnd: any;
  @Input() groupComponent: any = {};
  @Output() closeClicked = new EventEmitter();
  @Output() createClicked = new EventEmitter<string>();

  form: FormGroup;
  minDate: string = '';
  maxDate: string = '';
  loading = false;

  constructor() {
    this.form = new FormGroup({
      dateActivity: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.minDate = this.formatDateToISO(this.assistanceDateStart);
    this.maxDate = this.formatDateToISO(this.assistanceDateEnd);
  }

  formatDateToISO(dateStr: string): string {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  onClose(){
    this.closeClicked.emit();
  }

  create(): void {
    if (this.form.valid) {
      const selectedDate = this.form.value.dateActivity;
      this.createClicked.emit(selectedDate);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
