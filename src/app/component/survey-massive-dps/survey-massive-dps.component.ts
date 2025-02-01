import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-massive-dps',
  standalone: false,
  templateUrl: './survey-massive-dps.component.html',
  styleUrl: './survey-massive-dps.component.scss'
})
export class SurveyMassiveDpsComponent {

  form: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  loading = false;

  constructor(
      private surveyService: SurveyService,
      private router: Router
  ) {
      this.form = new FormGroup({
          file: new FormControl('', [Validators.required]),
      });
  }

  async create() {
      this.loading = true;
      this.surveyService
          .uploadDPSExcel(this.form.get('file')?.value)
          .subscribe((response: any) => {
              const url = window.URL.createObjectURL(response);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'aprobacionesCargadasDps.xlsx';
              link.click();
              window.URL.revokeObjectURL(url);
              this.loading = false;
          });
          await this.router.navigateByUrl('/app/dps')
  }

  file: any;
  async fileChange(event: any) {
      this.file = event.target.files[0];
      this.form.get('file')?.setValue(this.file);
  }

  download() {
    this.surveyService.downloadDPS().subscribe({
        next: (response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'jovenes_sin_validacion_dps.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        error: (error) => {
            console.error('Error descargando el archivo:', error);
            alert('Error descargando el archivo.');
        }
    });
  }

  openInput() {
      this.fileInput.nativeElement.click();
  }

}
