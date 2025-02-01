import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupComponentService } from '../../service/group-component.service';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-component-group-add',
  standalone: false,
  templateUrl: './component-group-add.component.html',
  styleUrl: './component-group-add.component.scss'
})
export class ComponentGroupAddComponent {
  group: any;

  form: FormGroup;

  constructor(private groupComponentService: GroupComponentService,

    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private router: Router) {
    this.form = new FormGroup({
      groupId: new FormControl('', Validators.required),
      componentId: new FormControl('', Validators.required),
    });
    this.group = {};
    this.group.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.form.controls['groupId'].setValue(this.group.id);
  }

  ngOnInit() {
    this.showGroup();
  }

  showGroup() {
    this.groupService.show(this.group.id)
      .subscribe((response: any) => {
        this.group = response.group;
      })
  }

  async create() {
    await this.groupComponentService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Componente creado correctamente', 'success');
          this.router.navigateByUrl(`/app/component-group/${this.group.id}`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el componente, puede que ya haya añadido este componente a este grupo.', 'error');
        }
      });
  }

  onComponentSelect(event: any) {
    this.form.patchValue({ componentId: event });
  }
}
