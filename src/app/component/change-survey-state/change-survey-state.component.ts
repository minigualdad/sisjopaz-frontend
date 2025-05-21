import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import Swal from 'sweetalert2';
import { environment } from '../../../enviroment/enviroment';

@Component({
  selector: 'app-change-survey-state',
  standalone: false,
  templateUrl: './change-survey-state.component.html',
  styleUrl: './change-survey-state.component.scss'
})
export class ChangeSurveyStateComponent {
  form: FormGroup;
  survey: any = {};
  constructor(
    public dialogRef: MatDialogRef<ChangeSurveyStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private surveyService: SurveyService,
  ) {
    this.form = new FormGroup({
      surveyId: new FormControl('', Validators.required),
      stateChanged: new FormControl('', Validators.required),
      stateMotive: new FormControl('', Validators.required),
    });
    this.form.get('surveyId')?.setValue(this.data.id);
  }

  ngOnInit(): void {
    this.showSurvey();
  }

  showSurvey() {
    this.surveyService.show(this.data.id).subscribe((response: any) => {
      this.form.get('stateChanged')?.setValue(response?.survey?.state);

      this.survey = response.survey;
      if (response.survey.secondName) {
        this.survey.name = ' ' + response.survey.secondName;
      } else {
        response.survey.secondName = '';
      }
      if (response.survey.secondLastName) {
        this.survey.name = ' ' + response.survey.secondLastName;
      } else {
        response.survey.secondLastName = '';
      }
      this.survey.name =
        response.survey.firstName +
        ' ' +
        response.survey.secondName +
        ' ' +
        response.survey.firstLastName +
        ' ' +
        response.survey.secondLastName;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateState() {
    this.surveyService.udpateState(this.form.value).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Se ha actualizado el estado del joven correctamente', 'success');
        this.dialogRef.close();
      },
      error: () => {
        Swal.fire('¡Error!', 'Error al actualizar el estado del joven los documentos', 'error');
      }
    });
  }
}
