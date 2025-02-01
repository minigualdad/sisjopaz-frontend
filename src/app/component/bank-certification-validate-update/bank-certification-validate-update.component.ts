import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';
import { environment } from '../../../enviroment/enviroment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-certification-validate-update',
  standalone: false,
  templateUrl: './bank-certification-validate-update.component.html',
  styleUrls: ['./bank-certification-validate-update.component.scss']
})
export class BankCertificationValidateUpdateComponent {
  form: FormGroup;
  url = environment.apiUrl + '/app/survey/files/';
  showMotivoInput = false;
  motive = '';
  decision: 'accept' | 'reject' | null = null;
  
  documentFileUrl: string | null = null;
  documentFileName: string | null = null;
  isPdf: boolean = false;                

  accountCertificationFile: any;
survey: any = {};
  constructor(
    public dialogRef: MatDialogRef<BankCertificationValidateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; },
    private http: HttpClient,
    private surveyService: SurveyService,
  ) {
    this.survey.id = this.data.id;
    this.form = new FormGroup({
      surveyId: new FormControl(this.data.id),
      accountCertificationMotive: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.showSurvey();
  }

  showSurvey(){
    this.surveyService.show(this.survey.id)
    .subscribe((response: any) => {
      this.survey = response.survey;
      if(response.survey.secondName){
        this.survey.name = ' ' + response.survey.secondName
      } else {
        response.survey.secondName = '';
      }
      if(response.survey.secondLastName){
        this.survey.name = ' ' + response.survey.secondLastName
      } else {
        response.survey.secondLastName = '';
      }
      this.survey.name = response.survey.firstName + ' ' +  response.survey.secondName + ' ' + response.survey.firstLastName + ' ' + response.survey.secondLastName;

      this. documentFileUrl = this.url + this.survey.accountCertificationUrl;
    })
  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.documentFileUrl = e.target.result;
        this.documentFileName = file.name;
        
        this.isPdf = file.type === 'application/pdf' 
          || this.documentFileName.toLowerCase().endsWith('.pdf');

        this.accountCertificationFile = file;
      };
      reader.readAsDataURL(file);
    }
  }

  openInNewTab() {
    if (this.documentFileUrl) {
      window.open(this.documentFileUrl, '_blank');
    }
  }

  downloadFile() {
    if (this.documentFileUrl) {
      const link = document.createElement('a');
      link.href = this.documentFileUrl;
      link.download = this.documentFileName || 'archivo';
      link.click();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async confirmValidate() {
    this.form.get('accountCertificationMotive')?.setValue(this.motive);

    const formData = this.form.value;
    const record = {
      ...formData,
      accountCertification: this.accountCertificationFile,
    };

    this.surveyService.updateBankCertification(record).subscribe({
      next: (response: any) => {
        Swal.fire('¡Éxito!', 'Certificación Bancaria actualizada correctamente', 'success');
        this.dialogRef.close();
      },
      error: (err) => {
        Swal.fire('¡Error!', 'Error al actualizar la certificación bancaria', 'error');
      }
    });
  }
}
