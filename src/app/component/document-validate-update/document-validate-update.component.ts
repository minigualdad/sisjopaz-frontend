import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';
import { environment } from '../../../enviroment/enviroment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-document-validate-update',
  standalone: false,
  templateUrl: './document-validate-update.component.html',
  styleUrl: './document-validate-update.component.scss'
})
export class DocumentValidateUpdateComponent {
  form: FormGroup;
  url = environment.apiUrl+'/app/survey/files/';
  showMotivoInput = false;
  motive = '';
  decision: 'accept' | 'reject' | null = null;
  frontImage: any;
  backImage: any;
  frontImageFile: any;
  backImageFile: any;
  survey: any = {};

  constructor(
    public dialogRef: MatDialogRef<DocumentValidateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number;},
    private surveyService: SurveyService,
  ) {
    this.survey.id = this.data.id;
    this.form = new FormGroup({
      surveyId: new FormControl(this.data.id),
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
      this.frontImage = this.url + this.survey.frontIdentificationtUrl;
      this.backImage =this.url + this.survey.backIdentificationUrl;
    })
  }


  onFileSelected(event: Event, type: 'front' | 'back'): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
  
      // Usar la librería de compresión de imágenes
      imageCompression(file, options)
        .then((compressedFile) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            if (type === 'front') {
              this.frontImage = e.target.result; // Asignar la URL comprimida
              this.frontImageFile = compressedFile; // Asignar el archivo comprimido
            } else {
              this.backImage = e.target.result; // Asignar la URL comprimida
              this.backImageFile = compressedFile; // Asignar el archivo comprimido
            }
          };
          reader.readAsDataURL(compressedFile);
        })
        .catch((error) => {
          console.error('Error al comprimir la imagen:', error);
        });
    }
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }

  async confirmValidate() {
    this.form.get('documentIdentificationMotive')?.setValue(this.motive);
    const formData = this.form.value;

    const record = {
      ...formData,
      documentFront: this.frontImageFile,
      documentBack: this.backImageFile, 
    };
    await this.surveyService.updateAccountCertification(record).subscribe({
      next: (response: any) => {
        Swal.fire('¡Éxito!', 'Documento actualizado correctamente', 'success');
        this.dialogRef.close();
      },
      error: (err) => {
        Swal.fire('¡Error!', 'Error al actualizar el documento', 'error');
      }
    });
  }
}
