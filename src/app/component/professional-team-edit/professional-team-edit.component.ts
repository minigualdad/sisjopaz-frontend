import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfessionalTeamService } from '../../service/professional-team.service';

@Component({
    selector: 'app-professional-team-edit',
    templateUrl: './professional-team-edit.component.html',
    styleUrl: './professional-team-edit.component.scss',
    standalone: false
})
export class ProfessionalTeamEditComponent {
  professionalTeam: any;
  form: FormGroup;

  constructor(private professionalTeamService: ProfessionalTeamService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      coordinatorId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
    });
    this.professionalTeam = {};
    this.professionalTeam.id = this.activatedRoute.snapshot.paramMap.get('id');
    ;
  }

  async ngOnInit() {
    this.professionalTeamService.show(this.professionalTeam.id )
      .subscribe({
        next: (response: any) => {
          this.professionalTeam = response.professionalTeam;
            this.form.patchValue(response.professionalTeam);
        }
      });
  }
  async edit() {
    this.professionalTeamService.edit(this.professionalTeam.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Equipo profesional editado correctamente', 'success');
          this.router.navigateByUrl(`/app/professional-team/${this.professionalTeam.regionId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el equipo profesional', 'error');
        }
        
    });
  }
  onUserSelect(event: any) {
    this.form.patchValue({ userId: event });
  }

  onCoordinatorSelect(event: any) {
    this.form.patchValue({ coordinatorId: event });
  }
}
