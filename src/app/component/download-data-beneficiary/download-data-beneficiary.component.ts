// download-data-beneficiary.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-download-data-beneficiary',
  standalone: false,
  templateUrl: './download-data-beneficiary.component.html',
  styleUrls: ['./download-data-beneficiary.component.scss']
})
export class DownloadDataBeneficiaryComponent implements OnInit, AfterViewInit{

  loading: boolean = true;

  constructor(private surveyService: SurveyService) {  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  downloadContactReport() {
    this.loading = true;
    this.surveyService.downloadBeneficiariesApi().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Datos-De-Contacto.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.loading = false;
      },
      error: (error) => {
          console.error('Error descargando el archivo:', error);
          alert('Error descargando el archivo.');
          this.loading = false;
      }
    });
  }

  downloadProgressReport() {
    this.loading = true;
    this.surveyService.downloadBeneficiariesActivitiesApi().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Avance-Por-Actividad.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.loading = false;
      },
      error: (error) => {
          console.error('Error descargando el archivo:', error);
          alert('Error descargando el archivo.');
          this.loading = false;
      }
    });
  }
}
