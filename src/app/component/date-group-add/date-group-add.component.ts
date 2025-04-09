import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DateGroupService } from '../../service/date-group.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-date-group-add',
  standalone: false,
  templateUrl: './date-group-add.component.html',
  styleUrl: './date-group-add.component.scss'
})
export class DateGroupAddComponent {

  form: FormGroup;
  daysOfWeek = [
    { id: 2, name: 'Lunes' },
    { id: 3, name: 'Martes' },
    { id: 4, name: 'Miércoles' },
    { id: 5, name: 'Jueves' },
    { id: 6, name: 'Viernes' },
    { id: 7, name: 'Sábado' },
    { id: 1, name: 'Domingo' },
  ];
  
  constructor(private dateGroupService: DateGroupService,
              private router: Router) {
    this.form = new FormGroup( {
      name: new FormControl('', Validators.required),
      weekDays: new FormControl([], Validators.required),
    });
  }
  ngOnInit() {

  }

  onNameInput(event: any) {
    const value = event.target.value.toUpperCase();
    this.form.get('name')?.setValue(value, { emitEvent: false });
  }
  

  onCheckboxChange(event: any, id: number) {
  
    const selectedDays = this.form.get('weekDays')?.value || [];
  
    if (event.checked) {
      this.form.get('weekDays')?.setValue([...selectedDays, id]);
    } else {
      this.form.get('weekDays')?.setValue(selectedDays.filter((d: number) => d !== id));
    }
  
    this.form.get('weekDays')?.updateValueAndValidity(); // <- opcional
  }
  async create() {
    await this.dateGroupService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Programación creado correctamente', 'success');
          this.router.navigateByUrl(`/app/date-group`)
        },
        error: (error) => {
          console.error(error.error);
          Swal.fire('Operación incorrecta', `No se ha podido crear la programación. ${error.error.err}`, 'error');
        }
      });
  }
}
