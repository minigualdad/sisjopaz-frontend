import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupProfessionalTeamService } from '../../service/group-professional-team.service';
import { GroupService } from '../../service/group.service';
import { GroupComponentService } from '../../service/group-component.service';

@Component({
    selector: 'app-group-professional-team-add',
    templateUrl: './group-professional-team-add.component.html',
    styleUrl: './group-professional-team-add.component.scss',
    standalone: false
})
export class GroupProfessionalTeamAddComponent implements OnInit{
  group: any;
  groupComponent: any = { id: 0};
  component: any;
  form: FormGroup;

  constructor(private groupProfessionalTeamService: GroupProfessionalTeamService,
              private groupComponentService: GroupComponentService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.groupComponent.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.form = new FormGroup({
      groupComponentId: new FormControl('', Validators.required),
      professionalId: new FormControl('', Validators.required),
    });
    this.form.get('groupComponentId')?.setValue(this.groupComponent.id);
  }

  ngOnInit() {
    this.getGroupComponent()
  }


async getGroupComponent(){
  this.groupComponentService.show(this.groupComponent.id)
  .subscribe((response: any) => {    
    this.group = response.groupComponent.Group;
    this.component = response.groupComponent.Component;
  })
}

  async create() {
    await this.groupProfessionalTeamService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'grupo de equipo profesional creado correctamente', 'success');
          this.router.navigateByUrl(`/app/group-professional-team/${this.groupComponent.id}`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el grupo de equipo profesional, puede que el profesional ya este en el grupo', 'error');
        }
      });
  }

  onProfessionalTeamSelect(event: any) {
    this.form.patchValue({ professionalId: event });
  }

}
