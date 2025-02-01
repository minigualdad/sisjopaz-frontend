import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CoordinatorService } from '../../service/coordinator.service';

@Component({
    selector: 'app-coordinator-add',
    templateUrl: './coordinator-add.component.html',
    styleUrl: './coordinator-add.component.scss',
    standalone: false
})
export class CoordinatorAddComponent {
  region: any;

  form: FormGroup;

  constructor(private coordinatorService: CoordinatorService,

  private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.form = new FormGroup( {
      name: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      divipolaId: new FormControl('', Validators.required),
      regionalLinkId: new FormControl('', Validators.required),
      regionId: new FormControl('', Validators.required),
    });
    this.region = {};
    this.region.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls['regionId'].setValue(this.region.id);
  }
  
  ngOnInit() {

  }


  async create() {
    await this.coordinatorService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Coordinador creado correctamente', 'success');
          this.router.navigateByUrl(`/app/coordinator/${this.region.id}`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el coordinator', 'error');
        }
      });
  }

  onUserSelect(event: any) {
    this.form.patchValue({ userId: event });
  }
  onRegionalLinkSelect(event: any){
    this.form.patchValue({ regionalLinkId: event });
  }

  onDivipolSelect(event: any) {
    this.form.patchValue({ divipolaId: event });
  }
}
