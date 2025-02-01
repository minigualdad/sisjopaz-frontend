import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../../service/component.service';

@Component({
    selector: 'app-component-edit',
    templateUrl: './component-edit.component.html',
    styleUrl: './component-edit.component.scss',
    standalone: false
})
export class ComponentEditComponent {
  component: any;
  form: FormGroup;

  constructor(private componentService: ComponentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      entityResponsibleName: new FormControl('', Validators.required)
    });
    this.component = {};
    this.component.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.componentService.show(this.component.id)
      .subscribe({
        next: (response: any) => {
          this.component = response.component;
          this.form.patchValue(response.component);
        }
      });
  }
  async edit() {
    this.componentService.edit(this.component.id, this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Componente editado correctamente', 'success');
          this.router.navigateByUrl('/app/component')
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el componente', 'error');
        }
      });
  }
}
