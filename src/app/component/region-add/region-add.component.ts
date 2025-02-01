import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegionalService } from '../../service/regional.service';

@Component({
  selector: 'app-region-add',
  standalone: false,
  templateUrl: './region-add.component.html',
  styleUrl: './region-add.component.scss'
})
export class RegionAddComponent {
  form: FormGroup;

  constructor(private regionService: RegionalService,
    private router: Router) {
    this.form = new FormGroup({
      departmentId: new FormControl('', Validators.required),
    });

  }
  ngOnInit() {
  }


  async create() {
    await this.regionService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Región habilitada correctamente', 'success');
          this.router.navigateByUrl(`/app/region`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido habilitar la región', 'error');
        }
      });
  }

  onDepartmentSelect(event: any) {
    this.form.patchValue({ departmentId: event });
  }

}
