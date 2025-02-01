import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PointService } from '../../service/point.service';

@Component({
  selector: 'app-point-edit',
  standalone: false,
  templateUrl: './point-edit.component.html',
  styleUrl: './point-edit.component.scss'
})
export class PointEditComponent {
  point: any;
  form: FormGroup;

  constructor(private pointService: PointService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.point = {};
    this.point.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.pointService.show(this.point.id )
      .subscribe({
        next: (response: any) => {
          this.point = response.point;
            this.form.patchValue(response.point);
        }
      });
  }
  async edit() {
    this.pointService.edit(this.point.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Punto editado correctamente', 'success');
          this.router.navigateByUrl(`/app/point/${this.point.divipolaId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el punto', 'error');
        }
        
    });
  }

}
