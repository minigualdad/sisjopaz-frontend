import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupComponentDateActivityService } from '../../service/group-component-date-activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-massive-date-activity-all-group-component',
  standalone: false,
  templateUrl: './massive-date-activity-all-group-component.component.html',
  styleUrl: './massive-date-activity-all-group-component.component.scss'
})
export class MassiveDateActivityAllGroupComponentComponent {

  form: FormGroup;
  backRoute = "app/group";

  constructor(private groupComponentDateActivityService: GroupComponentDateActivityService,
  ) {
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
      text: 'Esta acción Llamará los horarios masivamente según el mes anterior de cada componente de los grupos y no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Ejecutar el servicio si el usuario confirma
        this.groupComponentDateActivityService.addMassiveAllGroups(
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
