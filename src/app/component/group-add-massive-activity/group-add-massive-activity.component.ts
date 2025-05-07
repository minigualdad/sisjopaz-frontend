import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupComponentDateActivityService } from '../../service/group-component-date-activity.service';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';

@Component({
  selector: 'app-group-add-massive-activity',
  standalone: false,
  templateUrl: './group-add-massive-activity.component.html',
  styleUrl: './group-add-massive-activity.component.scss'
})
export class GroupAddMassiveActivityComponent {

  groupComponent: any = {};
  form: FormGroup;
  loading = false;

  constructor(private groupComponentDateActivityBenefiaryService: GroupComponentDateActivityBenefiaryService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      periodId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  setPeriodId(event: number) {
    this.form.get('periodId')!.setValue(event);
  }
    
  create(): void {
    // Mostrar confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción creará asignaciones de horarios masivas a los jóvenes y no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.groupComponentDateActivityBenefiaryService.addActivitiesAllGroups(
          this.form.get('periodId')!.value,
        ).subscribe({
          next: () => {
            this.loading = false;
            Swal.fire(
              '¡Creado!',
              'Las asignaciones a los Jóvenes masivas se han creado con éxito.',
              'success'
            );
          },
          error: () => {
            this.loading = false;
            Swal.fire(
              'Error',
              'Ocurrió un problema al crear las actividades.',
              'error'
            );
          }
        });
      }
    });
  }
      

}
