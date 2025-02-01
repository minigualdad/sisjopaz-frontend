import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PointService } from '../../service/point.service';
import { DivipolService } from '../../service/divipol.service';

@Component({
  selector: 'app-point-add',
  standalone: false,
  templateUrl: './point-add.component.html',
  styleUrl: './point-add.component.scss'
})
export class PointAddComponent {
  divipola: any;
  form: FormGroup;

  constructor(private pointService: PointService,
    private activatedRoute: ActivatedRoute,
    private divipolaService: DivipolService,
    private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      divipolaId: new FormControl('', Validators.required),
    });
    this.divipola = {};
    this.divipola.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls['divipolaId'].setValue(this.divipola.id);

  }
  ngOnInit() {
    this.showDivipola();
  }

  showDivipola(){
    this.divipolaService.show(this.divipola.id)
    .subscribe((response: any) => {
      this.divipola = response.divipola;
    })

  }

  async create() {
    await this.pointService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Punto creado correctamente', 'success');
          this.router.navigateByUrl(`/app/point/${this.divipola.id}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el punto', 'error');
        }
      });
  }

}
