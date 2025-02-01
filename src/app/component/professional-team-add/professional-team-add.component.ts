import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfessionalTeamService } from '../../service/professional-team.service';
@Component({
    selector: 'app-professional-team-add',
    templateUrl: './professional-team-add.component.html',
    styleUrl: './professional-team-add.component.scss',
    standalone: false
})
export class ProfessionalTeamAddComponent {
  region: any = {};
  form: FormGroup;

  constructor(private professionalTeamService: ProfessionalTeamService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      coordinatorId: new FormControl('', Validators.required),
      regionId: new FormControl('', Validators.required),
    });
    this.region = {};
    this.region.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls['regionId'].setValue(this.region.id);

  }
  ngOnInit() {
  }


  async create() {
    await this.professionalTeamService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Equipo Profesional creado correctamente', 'success');
          this.router.navigateByUrl(`/app/professional-team/${this.region.id}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el equipo profesional', 'error');
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
