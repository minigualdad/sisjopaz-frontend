import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../service/calendar.service';

@Component({
  selector: 'app-calendar-working-days-edit',
  standalone: false,
  templateUrl: './calendar-working-days-edit.component.html',
  styleUrl: './calendar-working-days-edit.component.scss'
})
export class CalendarWorkingDaysEditComponent {
  calendar: any;
  form: FormGroup;

  constructor(private calendarService: CalendarService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      isLaboral: new FormControl('', Validators.required),
    });
    this.calendar = {};
    this.calendar.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.calendarService.show(this.calendar.id )
      .subscribe({
        next: (response: any) => {
          this.calendar = response.calendar;
            this.form.patchValue(response.calendar);
        }
      });
  }
  async edit() {
    this.calendarService.edit(this.calendar.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Día editado correctamente', 'success');
          this.router.navigateByUrl(`/app/calendar-working-days`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el Día', 'error');
        }
        
    });
  }

}
