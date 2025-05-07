import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-update-preregister',
  standalone: false,
  templateUrl: './update-preregister.component.html',
  styleUrl: './update-preregister.component.scss'
})
export class UpdatePreregisterComponent {
  survey: any;
  form: FormGroup;
  reset = false;
  identificationNumber: any;
  errorMessage: string = '';
  selectedDocumentType: string = '';
  backRoute = "app/beneficiary-no-validate";


  constructor(private surveyService: SurveyService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      identificationTypeId: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      firstNameOriginal: new FormControl('', [Validators.required]),
      secondNameOriginal: new FormControl('', []),
      firstLastNameOriginal: new FormControl('', [Validators.required]),
      secondLastNameOriginal: new FormControl('', []),
      bornDateOriginal: new FormControl('', [Validators.required]),
    });
    this.survey = {};
    this.survey.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.surveyService.show(this.survey.id)
      .subscribe({
        next: (response: any) => {
          this.survey = response.survey;
          this.form.patchValue(response.survey);
        }
      });
  }
  async edit() {
    this.surveyService.edit(this.survey.id, this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Prerregistro editado correctamente', 'success');
          this.router.navigateByUrl('/app/beneficiary-no-validate')
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el Prerregistro', 'error');
        }
      });
  }
  onSelectIdentificationType(event: any){
    this.form.get('identificationTypeId')?.setValue(event);
  }
}
