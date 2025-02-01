import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { BENEFICIARY_STATES } from '../../shared/constants/constants';

@Component({
    selector: 'app-beneficiary-add',
    templateUrl: './beneficiary-add.component.html',
    styleUrl: './beneficiary-add.component.scss',
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class BeneficiaryAddComponent {
  professionalTeam: any;
  states: any = [];

  form: FormGroup;

  constructor(private beneficiaryService: BeneficiaryService,
              private router: Router) {
                this.states = Object.entries(BENEFICIARY_STATES);
    this.form = new FormGroup( {
      professionalTeamId: new FormControl('', Validators.required),
      surveyId: new FormControl('', Validators.required),
      groupId: new FormControl('', Validators.required),
      agreementSignatureDate: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required)
    });   
  }
  ngOnInit() {

  }


  async create() {
    await this.beneficiaryService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Joven creado correctamente', 'success');
          this.router.navigateByUrl(`/app/beneficiary`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el Joven', 'error');
        }
      });
  }

  onGroupIdSelect(event: any) {
    this.form.patchValue({ groupId: event });
  }
  onProfessionalTeamSelect(event: any) {
    this.form.patchValue({ professionalTeamId: event });
  }
  onSelectSurvey(event: any){
    this.form.controls['surveyId'].setValue(event.id);
  }

}
