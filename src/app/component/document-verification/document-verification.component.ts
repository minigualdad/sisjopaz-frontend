import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import Swal from 'sweetalert2';
import { IdentificationTypeService } from '../../service/identification-type.service';
import imageCompression from 'browser-image-compression';
import { environment } from '../../../enviroment/enviroment';
import { AccountCertLogService } from '../../service/account-cert-log.service';
import { IdentificationLogService } from '../../service/identification-log.service';

@Component({
  selector: 'app-document-verification',
  standalone: false,
  templateUrl: './document-verification.component.html',
  styleUrl: './document-verification.component.scss'
})
export class DocumentVerificationComponent {
  form: FormGroup;
  frontImageUrl: string | null = null;
  backImageUrl: string | null = null;
  hasFrontFileLoaded: boolean = false;
  hasBackFileLoaded: boolean = false;
  survey: any = {};
  identificationTypeId: any;
  frontImageFile: any;
  backImageFile: any;
  documentFileUrl: string | null = null;
  documentFileName: string | null = null;
  isPdf: boolean = false;
  hasFileLoaded: boolean = false;
  server: any = environment.apiUrl + '/app/survey/files/';

  accountCertificationFile: any;
  documentTypes: any[] = [];
  showMotiveInput = false;
  accountCertLog: any;
  identificationLog: any;
  constructor(
    public dialogRef: MatDialogRef<DocumentVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private surveyService: SurveyService,
    private _identificationTypeService: IdentificationTypeService,
    private accountCertLogService: AccountCertLogService,
    private identificationLogService: IdentificationLogService,
  ) {
    this.form = new FormGroup({
      surveyId: new FormControl('', Validators.required),
      identificationTypeId: new FormControl('', Validators.required),
      identification: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      bankId: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      identificationExpedition: new FormControl('', [Validators.required, this.dateNotInFuture.bind(this)]),
      documentsCheck: new FormControl('', Validators.required),
      documentsMotive: new FormControl('', Validators.required),
      frontIdentificationtUrl: new FormControl('', Validators.required),
      backIdentificationUrl: new FormControl('', Validators.required),
      accountCertificationUrl: new FormControl('', Validators.required),
    });
    this.form.get('surveyId')?.setValue(this.data.id);
  }

  ngOnInit(): void {
    this.showAccountCertLog();
    this.showIdentificationLog();
    this.showSurvey();
    this.getIdentificationsTypes();
  }

  getIdentificationsTypes() {
    this._identificationTypeService.getAll().subscribe({
      next: (response: any) => {
        this.documentTypes = response.identificationTypes;
      },
      error: (error: any) => { },
    });
  }

  showAccountCertLog() {
    this.accountCertLogService.showBySurveyId(this.data.id)
      .subscribe({
        next: (response: any) => {
          this.accountCertLog = response.accountCertLog;
          this.documentFileUrl = this.server + response.accountCertLog.accountBankURL;
          this.form.get('accountCertificationUrl')?.setValue(response.accountCertLog.accountBankURL);
          this.form.get('bankId')?.setValue(this.accountCertLog.bankId);
          this.form.get('accountType')?.setValue(this.accountCertLog.accountType);
          this.form.get('accountNumber')?.setValue(this.accountCertLog.accountNumber);
        },
        error: (error: any) => {
          console.error(error);
        }

      });
  }

  showIdentificationLog() {
    this.identificationLogService.showBySurveyId(this.data.id)
      .subscribe({
        next: (response: any) => {
          this.identificationLog = response.identificationLog;
          this.frontImageUrl = this.server + response.identificationLog.frontIdentificationtUrl;
          this.backImageUrl = this.server + response.identificationLog.backIdentificationUrl;
          this.form.get('frontIdentificationtUrl')?.setValue(response.identificationLog.frontIdentificationtUrl);
          this.form.get('backIdentificationUrl')?.setValue(response.identificationLog.backIdentificationUrl);
          this.form.get('identificationExpedition')?.setValue(response.identificationLog.identificationExpedition.split('T')[0]);
          this.form.get('identificationTypeId')?.setValue(response.identificationLog.identificationTypeId);

        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }

  showSurvey() {
    this.surveyService.show(this.data.id).subscribe((response: any) => {
      this.form.get('identification')?.setValue(response?.survey?.identification);
      this.form.get('identificationTypeId')?.setValue(response?.survey?.identificationTypeId);
      this.form.get('expeditionDate')?.setValue(response?.survey?.identificationExpedition?.split('T')[0]);

      this.survey = response.survey;
      // Formatea el nombre completo
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

  onFrontFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      imageCompression(file, options)
        .then((compressedFile) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.frontImageUrl = e.target.result;
            this.hasFrontFileLoaded = true;
            this.frontImageFile = compressedFile;
          };
          reader.readAsDataURL(compressedFile);
        })
        .catch((error) => {
          console.error('Error al comprimir la imagen:', error);
        });
    }
  }

  setIdentificationType(event: number) {
    this.form.get('identificationTypeId')?.setValue(event);
  }

  validateNumber(event: KeyboardEvent): boolean {
    const key = event.key;

    const allowedKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];

    if (!allowedKeys.includes(key)) {
      event.preventDefault();
      return false;
    }
    return true;
  }


  openImageInNewTab(imageUrl: string | null) {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
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


  onBankSelect(event: any) {
    this.form.patchValue({ bankId: event });
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
  onAccept(): void {
    this.form.get('documentsCheck')?.setValue('Aprobado');
    this.showMotiveInput = true;
  }

  onReject(): void {
    this.form.get('documentsCheck')?.setValue('No Validado');
    this.showMotiveInput = true;
  }

  confirmValidate() {
    this.surveyService.verifyDocuments(this.form.value).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Documentos validados correctamente', 'success');
        this.dialogRef.close();
      },
      error: () => {
        Swal.fire('¡Error!', 'Error al validar los documentos', 'error');
      }
    });
  }
}
