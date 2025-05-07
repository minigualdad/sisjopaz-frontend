import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import Swal from 'sweetalert2';
import { IdentificationTypeService } from '../../service/identification-type.service';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-update-document',
  standalone: false,
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss'],
})
export class UpdateDocumentComponent implements OnInit {
  form: FormGroup;
  frontImageUrl: string | null = null;
  backImageUrl: string | null = null;
  hasFrontFileLoaded: boolean = false;
  hasBackFileLoaded: boolean = false;
  survey: any = {};
  identificationTypeId: any;
  frontImageFile: any;
  backImageFile: any;

  documentTypes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private surveyService: SurveyService,
    private _identificationTypeService: IdentificationTypeService
  ) {
    this.form = new FormGroup({
      documentType: new FormControl('', Validators.required),
      documentNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
    });
  }

  ngOnInit(): void {
    this.showSurvey();
    this.getIdentificationsTypes();
  }

  getIdentificationsTypes() {
    this._identificationTypeService.getAll().subscribe({
      next: (response: any) => {
        this.documentTypes = response.identificationTypes;
      },
      error: (error: any) => {},
    });
  }

  showSurvey() {
    this.surveyService.show(this.data.id).subscribe((response: any) => {
      this.form
        .get('documentNumber')
        ?.setValue(response?.survey?.identification);

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
    this.form.get('documentType')?.setValue(event);
    console.log('Valor: ', this.form.get('documentType')?.value);
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

  onBackFileSelected(event: Event): void {
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
            this.backImageUrl = e.target.result;
            this.hasBackFileLoaded = true;
            this.backImageFile = compressedFile;
          };
          reader.readAsDataURL(compressedFile);
        })
        .catch((error) => {
          console.error('Error al comprimir la imagen:', error);
        });
    }
  }

  openImageInNewTab(imageUrl: string | null) {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit() {
    const record = {
      surveyId: Number(this.data.id),
      identificationTypeId: this.form.get('documentType')?.value,
      identification: this.form.get('documentNumber')?.value,
      documentFront: this.frontImageFile,
      documentBack: this.backImageFile, 
    };

    this.surveyService
      .updateSurveyDocumentsAndDocumentType(record)
      .subscribe({
        next: (response: any) => {
          Swal.fire(
            'Éxito',
            'Documentos actualizados correctamente',
            'success'
          ).then(() => {
            this.dialogRef.close({ success: true });
          });
        },
        error: (error: any) => {
          Swal.fire(
            'Error',
            'Por favor complete todos los campos y suba ambas imágenes',
            'error'
          );
        },
      });
  }
}