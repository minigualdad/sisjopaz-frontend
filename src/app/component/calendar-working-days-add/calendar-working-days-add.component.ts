import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CalendarService } from '../../service/calendar.service';

@Component({
  selector: 'app-calendar-working-days-add',
  standalone: false,
  templateUrl: './calendar-working-days-add.component.html',
  styleUrl: './calendar-working-days-add.component.scss'
})
export class CalendarWorkingDaysAddComponent {
  @Input() reset: boolean = false;
  form: FormGroup;
  laboral = [
    { key: "SI", value: "Sí" },
    { key: "NO", value: "No" },
  ];

  constructor(private calendarService: CalendarService,
    private router: Router) {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      isLaboral: new FormControl('', Validators.required),
      isHoliday: new FormControl('', Validators.required),
    });

  }
  ngOnInit() {

  }


  async create() {
    await this.calendarService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Día hábil creado correctamente', 'success');
          this.router.navigateByUrl(`/app/calendar-working-days`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el día hábil', 'error');
        }
      });
  }

  setHoliday(event: string) {
    if(event === 'SI'){
      this.form.get('isLaboral')?.setValue(event);
      this.form.get('isHoliday')?.setValue('NO');

    }else {
      this.form.get('isHoliday')?.setValue(event);
      this.form.get('isLaboral')?.setValue('SI');
    }
  }


  reseting() {
    this.form.reset();
    this.reset = true;
    setTimeout(() => {
      this.reset = false;
    }, 100);

  }
}
