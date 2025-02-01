import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupComponentDateActivityService } from '../../service/group-component-date-activity.service';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';

@Component({
  selector: 'app-group-component-activity-beneficiary-add-massive',
  standalone: false,
  templateUrl: './group-component-activity-beneficiary-add-massive.component.html',
  styleUrl: './group-component-activity-beneficiary-add-massive.component.scss'
})
export class GroupComponentActivityBeneficiaryAddMassiveComponent {

  groupComponent: any = {};
  form: FormGroup;
  group: any = {};
  component: any = {};

  constructor(private groupComponentDateActivityService: GroupComponentDateActivityService,
              private groupComponentDateActivityBenefiaryService: GroupComponentDateActivityBenefiaryService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      periodId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.groupComponentDateActivityService.getAllByGroupComponentId(this.groupComponent.id)
    .subscribe( (response: any) => {
      this.group = response.group;
      this.component = response.component;
    });
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
        // Ejecutar el servicio si el usuario confirma
        this.groupComponentDateActivityBenefiaryService.addActivities(
          this.groupComponent.id,
          this.form.get('periodId')!.value,
        ).subscribe({
          next: () => {
            Swal.fire(
              '¡Creado!',
              'Las asignaciones a los Jóvenes masivas se han creado con éxito.',
              'success'
            );
          },
          error: () => {
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
