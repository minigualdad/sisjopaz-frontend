import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateGroupService } from '../../service/date-group.service';

@Component({
  selector: 'app-date-group-edit',
  standalone: false,
  templateUrl: './date-group-edit.component.html',
  styleUrl: './date-group-edit.component.scss'
})
export class DateGroupEditComponent {
  dateGroup: any;
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
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      weekDays: new FormControl([], Validators.required),
    });
    this.dateGroup = {};
    this.dateGroup.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.dateGroupService.show(this.dateGroup.id)
      .subscribe({
        next: (response: any) => {
          this.dateGroup = response.dateGroup;
          this.form.patchValue(response.dateGroup);
        }
      });
  }
  async edit() {
    this.dateGroupService.edit(this.dateGroup.id, this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Programación editada correctamente', 'success');
          this.router.navigateByUrl(`/app/date-group`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar la programación', 'error');
        }
      });
  }

  onCheckboxChange(event: any, id: number) {
    let rawValue = this.form.get('weekDays')?.value;
    let selectedDays: number[] = [];
  
    if (Array.isArray(rawValue)) {
      selectedDays = rawValue
        .filter((d: any) => d !== '' && d !== null && d !== undefined)
        .map((d: any) => Number(d))
        .filter((n) => !isNaN(n));
    } else if (typeof rawValue === 'string') {
      try {
        const parsed = JSON.parse(rawValue);
        if (Array.isArray(parsed)) {
          selectedDays = parsed
            .filter((d: any) => d !== '' && d !== null && d !== undefined)
            .map((d: any) => Number(d))
            .filter((n) => !isNaN(n));
        } else {
          selectedDays = rawValue
            .split(',')
            .filter((d) => d !== '' && d !== null && d !== undefined)
            .map((d) => Number(d))
            .filter((n) => !isNaN(n));
        }
      } catch {
        selectedDays = rawValue
          .split(',')
          .filter((d) => d !== '' && d !== null && d !== undefined)
          .map((d) => Number(d))
          .filter((n) => !isNaN(n));
      }
    } else if (typeof rawValue === 'number') {
      selectedDays = [rawValue];
    }
      if (event.checked) {
      if (!selectedDays.includes(id)) {
        selectedDays.push(id);
      }
    } else {
      selectedDays = selectedDays.filter((d) => d !== id);
    }
  
    selectedDays = selectedDays.filter((d) => d !== 0);
      this.form.get('weekDays')?.setValue(selectedDays);
  }
  
  
  

  

}
