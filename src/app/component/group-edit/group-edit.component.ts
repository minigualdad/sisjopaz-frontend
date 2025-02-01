import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../service/group.service';

@Component({
    selector: 'app-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrl: './group-edit.component.scss',
    standalone: false
})
export class GroupEditComponent {
  group: any;
  form: FormGroup;

  constructor(private groupService: GroupService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      initDate: new FormControl('', Validators.required),
      observations: new FormControl('', Validators.required),
    });
    this.group = {};
    this.group.id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  async ngOnInit() {
    this.groupService.show(this.group.id)
      .subscribe({
        next: (response: any) => {
          this.group = response.group;
          // this.group.date = response.group.date.split('T')[0]
          this.form.patchValue(response.group);
        }
      });
  }
  async edit() {
    this.groupService.edit(this.group.id, this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Grupo editado correctamente', 'success');
          this.router.navigateByUrl('/app/group')
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el grupo', 'error');
        }
      });
  }
}
