import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoordinatorService } from '../../service/coordinator.service';

@Component({
    selector: 'app-coordinator-edit',
    templateUrl: './coordinator-edit.component.html',
    styleUrl: './coordinator-edit.component.scss',
    standalone: false
})
export class CoordinatorEditComponent {
  coordinator: any;
  form: FormGroup;

  constructor(private coordinatorService: CoordinatorService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      divipolaId: new FormControl('', Validators.required),
      regionalLinkId: new FormControl('', Validators.required),
    });
    this.coordinator = {};
    this.coordinator.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.coordinatorService.show(this.coordinator.id )
      .subscribe({
        next: (response: any) => {
          this.coordinator = response.coordinator;
            this.form.patchValue(response.coordinator);
        }
      });
  }
  async edit() {
    this.coordinatorService.edit(this.coordinator.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Coordinador editado correctamente', 'success');
          this.router.navigateByUrl(`/app/coordinator/${this.coordinator.regionalLinkId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el coordinador', 'error');
        }
        
    });
  }
  onUserSelect(event: any) {
    this.form.patchValue({ userId: event });
  }

  onDivipolSelect(event: any) {
    this.form.patchValue({ divipolId: event });
  }
}
