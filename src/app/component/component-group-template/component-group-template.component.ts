import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-component-group-template',
  standalone: false,
  templateUrl: './component-group-template.component.html',
  styleUrl: './component-group-template.component.scss',
})
export class ComponentGroupTemplateComponent implements OnInit {
  form: FormGroup;
  months: { value: number; name: string }[] = [];
  years: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ComponentGroupTemplateComponent>,
    private surveyService: SurveyService
  ) {
    this.form = this.fb.group({
      groupComponentId: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.get('groupComponentId')?.setValue(this.data.id);
    this.initializeMonthYearOptions();
  }

  initializeMonthYearOptions(): void {
    this.months = [
      { value: 1, name: 'Enero' },
      { value: 2, name: 'Febrero' },
      { value: 3, name: 'Marzo' },
      { value: 4, name: 'Abril' },
      { value: 5, name: 'Mayo' },
      { value: 6, name: 'Junio' },
      { value: 7, name: 'Julio' },
      { value: 8, name: 'Agosto' },
      { value: 9, name: 'Septiembre' },
      { value: 10, name: 'Octubre' },
      { value: 11, name: 'Noviembre' },
      { value: 12, name: 'Diciembre' },
    ];
    this.years = Array.from(
      { length: new Date().getFullYear() - 2024 + 2 },
      (_, i) => 2024 + i
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const month = this.form.get('month')?.value;
      const year = this.form.get('year')?.value;
      let jsonData: any;
      this.surveyService.pdfAssistanceTemplate(this.form.value).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `plantilla-${month}-${year}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);

          Swal.fire({
            icon: 'success',
            title: 'Descarga completada',
            text: 'El archivo se descargó correctamente.',
            confirmButtonText: 'Continuar',
          }).then(() => {
            this.dialogRef.close();
          });
        },
        error: (error) => {
          processBlobAndShowSwal(error.error)
          .then(() => console.log('Swal mostrado con éxito.'))
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'warning',
              title: 'No se pudo generar la planilla',
              text: `Ocurrió un problema durante la descarga. No determinado`,
              confirmButtonText: 'Intentar nuevamente',
            });  
          });
        },
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

function processBlobAndShowSwal(blob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const fileContent = event.target?.result;

        if (typeof fileContent === 'string') {
          const jsonData = JSON.parse(fileContent);
          Swal.fire({
            icon: 'warning',
            title: 'No se pudo generar la planilla',
            text: `Ocurrió un problema durante la descarga. ${jsonData.message}`,
            confirmButtonText: 'Intentar nuevamente',
          });
          resolve(); // Resolvemos la promesa al terminar
        } else {
          throw new Error('El contenido del archivo no es válido.');
        }
      } catch (error) {
        reject(error); // Rechazamos si algo falla
      }
    };

    reader.onerror = () => {
      reject(new Error('Hubo un error al leer el archivo.'));
    };

    reader.readAsText(blob); // Inicia la lectura del Blob
  });
}
