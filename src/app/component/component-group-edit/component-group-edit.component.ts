import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupComponentService } from '../../service/group-component.service';

@Component({
  selector: 'app-component-group-edit',
  standalone: false,
  templateUrl: './component-group-edit.component.html',
  styleUrl: './component-group-edit.component.scss'
})
export class ComponentGroupEditComponent {
  groupComponent: any;
  form: FormGroup;

  constructor(private groupComponentService: GroupComponentService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      groupId: new FormControl('', Validators.required),
      professionalTeamId: new FormControl('', Validators.required),
      componentId: new FormControl('', Validators.required),
      dateGroupId: new FormControl('', Validators.required),
      scheduleDescription: new FormControl('', Validators.required)
    });
    this.groupComponent = {};
    this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.groupComponentService.show(this.groupComponent.id )
      .subscribe({
        next: (response: any) => {
          this.groupComponent = response.groupComponent;
            this.form.patchValue(response.groupComponent);
        }
      });
  }
  async edit() {
    this.groupComponentService.edit(this.groupComponent.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Coordinador editado correctamente', 'success');
          this.router.navigateByUrl(`/app/component-group/${this.groupComponent.groupId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el coordinador', 'error');
        }
        
    });
  }
  onProfessionalTeamSelect(event: any) {
    this.form.patchValue({ professionalTeamId: event });

  }
  onComponentSelect(event: any) {
    this.form.patchValue({ componentId: event });

  }
  onDateGroupSelect(event: any) {
    this.form.patchValue({ dateGroupId: event });

  }
}
