import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DivipolService } from '../../service/divipol.service';

@Component({
    selector: 'app-divipol-edit',
    templateUrl: './divipol-edit.component.html',
    styleUrl: './divipol-edit.component.scss',
    standalone: false
})
export class DivipolEditComponent {
  divipol: any;
  form: FormGroup;

  constructor(private divipolService: DivipolService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      municipalityCode: new FormControl('', Validators.required),
    });
    this.divipol = {};
    this.divipol.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.divipolService.show(this.divipol.id )
      .subscribe({
        next: (response: any) => {
          this.divipol = response.divipola;
            this.form.patchValue(response.divipola);
        }
      });
  }
  async edit() {
    this.divipolService.edit(this.divipol.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Región editada correctamente', 'success');
          this.router.navigateByUrl('/app/divipol')
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar la región', 'error');
        }
        
    });
  }

  onSelectDepartment(event: any){
    this.form.controls['departmentId'].setValue(event);
  }

}
