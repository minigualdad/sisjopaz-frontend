import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DivipolService } from '../../service/divipol.service';

@Component({
    selector: 'app-divipol-add',
    templateUrl: './divipol-add.component.html',
    styleUrl: './divipol-add.component.scss',
    standalone: false
})
export class DivipolAddComponent {

  form: FormGroup;

  constructor(private divipolService: DivipolService,
              private router: Router) {
    this.form = new FormGroup( {
      name: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      municipalityCode: new FormControl('', Validators.required),
    });
    
  }
  ngOnInit() {

  }


  async create() {
    await this.divipolService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Región creada correctamente', 'success');
          this.router.navigateByUrl(`/app/divipol`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear la región', 'error');
        }
      });
  }

  onSelectDepartment(event: any){
    this.form.controls['departmentId'].setValue(event);
  }
}
