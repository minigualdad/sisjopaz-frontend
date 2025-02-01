import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupComponentDateActivityService } from '../../service/group-component-date-activity.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-component-date-activity-add-massive',
  standalone: false,
  templateUrl: './group-component-date-activity-add-massive.component.html',
  styleUrl: './group-component-date-activity-add-massive.component.scss'
})
export class GroupComponentDateActivityAddMassiveComponent implements OnInit {

  groupComponent: any = {};
  form: FormGroup;
  group: any = {};
  component: any = {};

  constructor(private groupComponentDateActivityService: GroupComponentDateActivityService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      days: new FormControl('', [Validators.required]),
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

  setDays(event: number) {
    this.form.get('days')!.setValue(event);
  }

  setPeriodId(event: number) {
    this.form.get('periodId')!.setValue(event);
  }
    
  create(): void {
    // Mostrar confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción creará actividades masivas y no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Ejecutar el servicio si el usuario confirma
        this.groupComponentDateActivityService.addMassive(
          this.groupComponent.id,
          this.form.get('days')!.value,
          this.form.get('periodId')!.value,
        ).subscribe({
          next: () => {
            Swal.fire(
              '¡Creado!',
              'Las actividades masivas se han creado con éxito.',
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
