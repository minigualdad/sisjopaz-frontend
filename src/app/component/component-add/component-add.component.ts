import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComponentService } from '../../service/component.service';

@Component({
    selector: 'app-component-add',
    templateUrl: './component-add.component.html',
    styleUrl: './component-add.component.scss',
    standalone: false
})
export class ComponentAddComponent {

  form: FormGroup;

  constructor(private componentService: ComponentService,
              private router: Router) {
    this.form = new FormGroup( {
      name: new FormControl('', Validators.required),
      entityResponsibleName: new FormControl('', Validators.required),
    });
    
  }
  ngOnInit() {

  }


  async create() {
    await this.componentService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Componente creado correctamente', 'success');
          this.router.navigateByUrl(`/app/component`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el componente', 'error');
        }
      });
  }

}
