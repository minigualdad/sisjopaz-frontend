import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupComponentService } from '../../service/group-component.service';

@Component({
  selector: 'app-date-group-component-edit',
  standalone: false,
  templateUrl: './date-group-component-edit.component.html',
  styleUrl: './date-group-component-edit.component.scss'
})
export class DateGroupComponentEditComponent {
  groupComponent: any;

  form: FormGroup;

  constructor(private groupComponentService: GroupComponentService,

    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.form = new FormGroup({
      groupComponentId: new FormControl('', Validators.required),
      dateGroupId: new FormControl('', Validators.required),
    });
    this.groupComponent = {};
    this.groupComponent.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.form.controls['groupComponentId'].setValue(this.groupComponent.id);
  }

  ngOnInit() {
    this.showGroupComponent();
  }

  showGroupComponent() {
    this.groupComponentService.show(this.groupComponent.id)
      .subscribe((response: any) => {
        this.groupComponent = response.groupComponent;
        this.form.patchValue(response.groupComponent);

      })
  }

  async create() {
    await this.groupComponentService.editDateGroup(this.groupComponent.id, { ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Componente creado correctamente', 'success');
          this.router.navigateByUrl(`/app/component-group/${this.groupComponent.groupId}`)
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

  setDays(event: number) {
    this.form.get('dateGroupId')!.setValue(event);
  }
}
