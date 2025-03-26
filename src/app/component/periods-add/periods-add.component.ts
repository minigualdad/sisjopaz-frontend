import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PeriodService } from '../../service/period.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periods-add',
  standalone:false,
  templateUrl: './periods-add.component.html',
  styleUrl: './periods-add.component.scss'
})
export class PeriodsAddComponent {
 @Output() periodsEmitted = new EventEmitter<Boolean>();
  form: FormGroup;
  errorMessage: string | null = null;
  months: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", 
    "Junio", "Julio", "Agosto", "Septiembre", 
    "Octubre", "Noviembre", "Diciembre"
  ];
  

  constructor(private fb: FormBuilder, private _periodService: PeriodService) {
    const currentYear = new Date().getFullYear();
    const maxAllowedYear = currentYear + 1;

    this.form = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [
        Validators.required,
        this.yearValidator(maxAllowedYear)
      ]),
      // Otros controles...
    });
    
  }

  yearValidator(maxYear: number) {
    return (control: AbstractControl) => {
      const year = control.value;
      if (year > maxYear) {
        // this.errorMessage = `El año no puede ser mayor a ${maxYear}.`;
        return { yearInvalid: `El año no puede ser mayor a ${maxYear}.` };
      }
      return null; // Válido si no supera el máximo.
    };
  }

  onSubmit() {
    this._periodService.createPeriods(this.form.value).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: '¡Periodo creado!',
          text: 'El periodo ha sido creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.periodsEmitted.emit(false);
          }
        });
      },
      error: (err:any) => {
        console.error('Error fetching periods:', err);
      }
    });
  }
  onCancel() {
    this.periodsEmitted.emit(false);
  }
}
