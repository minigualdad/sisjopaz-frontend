import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-bank-data-add',
  standalone: false,
  templateUrl: './bank-data-add.component.html',
  styleUrl: './bank-data-add.component.scss'
})
export class BankDataAddComponent {
  survey: any = {};
  form: FormGroup;
  backRoute = "app/account-certification";

  constructor(private surveyService: SurveyService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup( {
      bankId: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
    });
  this.survey.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  this.form.patchValue({ surveyId: this.survey.id });
  }
  ngOnInit() {
    this.showSurvey();
  }
  
  showSurvey(){
    this.surveyService.show(this.survey.id)
    .subscribe((response: any) => {
      this.survey = response.survey;
    })
  }

  async create() {
    await this.surveyService.updateBankData(this.survey.id, {...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Información bancaria creada correctamente', 'success');
          this.router.navigateByUrl(`/app/account-certification`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear la información bancaria', 'error');
        }
      });
  }

  onBankSelect(event: any) {
    this.form.patchValue({ bankId: event });
  }
}
