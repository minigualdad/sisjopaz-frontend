import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';
import { environment } from '../../../enviroment/enviroment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  hasFileLoaded: boolean = false;

  accountCertificationFile: any;
  survey: any = {};
  backRoute = "app/bank-info";

  constructor(
    public dialogRef: MatDialogRef<BankCertificationValidateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; },
    private surveyService: SurveyService,
    private router: Router) {
    this.survey.id = this.data.id;
    this.form = new FormGroup({
      surveyId: new FormControl(this.data.id),
      accountCertificationMotive: new FormControl(''),
      bankId: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      expeditionDate: new FormControl('', [Validators.required, this.dateNotInFuture.bind(this)])
    });
  }

  dateNotInFuture(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null;
    }
  
    const now = new Date();
    const offsetColombia = -5; // UTC-5 para Colombia
    const nowColombia = new Date(now.getTime() + offsetColombia * 60 * 60 * 1000);
    
    const todayColombia = new Date(
      nowColombia.getFullYear(),
      nowColombia.getMonth(),
      nowColombia.getDate()
    );
  
    const selectedDate = new Date(control.value);
    
    const selectedDateColombia = new Date(
      selectedDate.getUTCFullYear(),
      selectedDate.getUTCMonth(),
      selectedDate.getUTCDate()
    );
  
    if (selectedDateColombia > todayColombia) {
      return { 'futureDate': true };
    }
  
    return null;
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
        this.hasFileLoaded = true;
        this.accountCertificationFile = file;
      };
      reader.readAsDataURL(file);
    } else {
      this.hasFileLoaded = false;
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

    async create() {
      await this.surveyService.updateBankData(this.survey.id, {...this.form.value})
        .subscribe({
          next: (response: any) => {
            Swal.fire('Operación correcta', 'Información bancaria creada correctamente', 'success').then((isConfirmed:any) =>{
              this.confirmValidate();
            });
          },
          error: (error) => {
            console.error(error);
            Swal.fire('Operación incorrecta', 'No se ha podido crear la información bancaria', 'error');
          }
        });
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
        Swal.fire('¡Éxito!', 'Certificación Bancaria actualizada correctamente', 'success').then((isConfirmed:any)=>{
          this.dialogRef.close({ success: true });
        });
      },
      error: (err) => {
        Swal.fire('¡Error!', 'Error al actualizar la certificación bancaria', 'error');
      }
    });
  }

  onBankSelect(event: any) {
    this.form.patchValue({ bankId: event });
  }
}
