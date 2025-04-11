import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-report-error-ia',
  standalone:false,
  templateUrl: './modal-report-error-ia.component.html',
  styleUrl: './modal-report-error-ia.component.scss'
})
export class ModalReportErrorIaComponent {
  @Output() modal = new EventEmitter<boolean>();
  @Input() assistanceScannerId = 0;

  showFormError = false;
  reportForm: FormGroup;

  constructor(
    private assistanceScannerService: AssistanceScannerService,
    private fb: FormBuilder
  ){
    this.reportForm = this.fb.group({
      errorDescription: ['', Validators.required],
    });
  }

  get errorDescription() {
    return this.reportForm.get('errorDescription');
  }

  closeModal() {
    this.modal.emit(false);
    this.reportForm.reset();
  }

  submitReport() {
      const description = this.reportForm.value.errorDescription;
      this.assistanceScannerService.sendReportError(description, this.assistanceScannerId).subscribe({
        next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Reporte enviado',
              text: 'El error ha sido reportado con éxito y será gestionado por alguien del Ministerio.',
              confirmButtonColor: '#2563eb', // Azul Tailwind
              confirmButtonText: 'Aceptar'
            }).then((confirmed:any) =>{
              this.modal.emit(false);
            });
      
            this.reportForm.reset();
            this.showFormError = false;
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar',
            text: 'No se pudo enviar el reporte. Por favor, intenta nuevamente.',
            confirmButtonColor: '#dc2626', // Rojo Tailwind
            confirmButtonText: 'Reintentar'
          });
        }
      })
    }
}
