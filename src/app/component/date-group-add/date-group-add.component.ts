import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DateGroupService } from '../../service/date-group.service';

@Component({
  selector: 'app-date-group-add',
  standalone: false,
  templateUrl: './date-group-add.component.html',
  styleUrl: './date-group-add.component.scss'
})
export class DateGroupAddComponent {

  form: FormGroup;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(private dateGroupService: DateGroupService,
              private router: Router) {
    this.form = new FormGroup( {
      name: new FormControl('', Validators.required),
      weekDays: new FormControl('', Validators.required),
    });
    
  }
  ngOnInit() {

  }


  async create() {
    await this.dateGroupService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Programación creado correctamente', 'success');
          this.router.navigateByUrl(`/app/date-group`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear la programación', 'error');
        }
      });
  }
}
