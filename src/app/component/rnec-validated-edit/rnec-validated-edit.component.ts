import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-rnec-validated-edit',
  standalone: false,
  templateUrl: './rnec-validated-edit.component.html',
  styleUrl: './rnec-validated-edit.component.scss'
})
export class RnecValidatedEditComponent {
  survey: any;
  form: FormGroup;
  reset = false;
  errorMessage: string = '';
  backRoute = "app/rnec-validated";


  constructor(private surveyService: SurveyService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      secondName: new FormControl('', []),
      firstLastName: new FormControl('', [Validators.required]),
      secondLastName: new FormControl('', []),
      bornDate: new FormControl('', [Validators.required]),
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
    this.surveyService.editRNECData(this.survey.id, this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Datos editados correctamente', 'success');
          this.router.navigateByUrl('/app/rnec-validated')
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar los datos', 'error');
        }
      });
  }
}
