import { HttpClient } from '@angular/common/http';
import { Component, Inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';
import { environment } from '../../../enviroment/enviroment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-certification-validate-verify',
  standalone: false,
  templateUrl: './bank-certification-validate-verify.component.html',
  styleUrl: './bank-certification-validate-verify.component.scss'
})
export class BankCertificationValidateVerifyComponent {
  form: FormGroup;
  url = environment.apiUrl + '/app/survey/files/';
  showMotivoInput = false;
  motive = '';
  decision: 'accept' | 'reject' | null = null;
  accountCert: string | null = null;

  @ViewChild('popoverContainer', { static: true }) popoverContainer!: ElementRef;
  showImageOptions = false;
  selectedImageUrl: string | null = null;
  popoverX = 0;
  popoverY = 0;
  survey: any = {};

  constructor(
    public dialogRef: MatDialogRef<BankCertificationValidateVerifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; },
    private surveyService: SurveyService,
  ) {
    this.survey.id = this.data.id
    this.form = new FormGroup({
      surveyId: new FormControl(this.data.id),
      accountCertificationCheck: new FormControl('', [Validators.required]),
      accountCertificationMotive: new FormControl('', [Validators.required]),
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

      this.accountCert = this.url + this.survey.accountCertificationUrl;
    })
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.form.get('accountCertificationCheck')?.setValue('Aprobado');
    this.showMotivoInput = true;
  }

  onReject(): void {
    this.form.get('accountCertificationCheck')?.setValue('No Validado');
    this.showMotivoInput = true;
  }

  confirmValidate() {
    this.form.get('accountCertificationMotive')?.setValue(this.motive);
    this.surveyService.setValidateDocuments(this.form.value).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Documento validado correctamente', 'success');
        this.dialogRef.close();
      },
      error: () => {
        Swal.fire('¡Error!', 'Error al validar el documento', 'error');
      }
    });
  }

  onImageClick(event: MouseEvent, imageUrl: string | null) {
    event.stopPropagation();
    if (!imageUrl) return;
    this.selectedImageUrl = imageUrl;
    const containerRect = this.popoverContainer.nativeElement.getBoundingClientRect();
    this.popoverX = event.clientX - containerRect.left;
    this.popoverY = event.clientY - containerRect.top;
    this.showImageOptions = true;
  }

  openImage() {
    if (this.selectedImageUrl) {
      window.open(this.selectedImageUrl, '_blank');
    }
    this.showImageOptions = false;
  }

  downloadImage() {
    if (!this.selectedImageUrl) return;
  
    fetch(this.selectedImageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al descargar la imagen.');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = 'documento.jpg';
        document.body.appendChild(link);
        link.click();
  
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error descargando la imagen:', error);
      });
  
    this.showImageOptions = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsidePopover = (event.target as HTMLElement).closest('.popover-menu');
    if (!clickedInsidePopover && this.showImageOptions) {
      this.showImageOptions = false;
    }
  }
}
