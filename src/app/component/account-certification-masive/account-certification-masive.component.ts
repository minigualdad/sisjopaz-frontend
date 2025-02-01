import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-certification-masive',
  standalone:false,
  templateUrl: './account-certification-masive.component.html',
  styleUrl: './account-certification-masive.component.scss'
})
export class AccountCertificationMasiveComponent {
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
          .uploadCorresponsabilityAgreementxcel(this.form.get('file')?.value)
          .subscribe((response: any) => {
              const url = window.URL.createObjectURL(response);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'aprobacionesCargadas.xlsx';
              link.click();
              window.URL.revokeObjectURL(url);
              this.loading = false;
          });
          await this.router.navigateByUrl('/app/survey')
  }

  file: any;
  async fileChange(event: any) {
      this.file = event.target.files[0];
      this.form.get('file')?.setValue(this.file);
  }

  openInput() {
      this.fileInput.nativeElement.click();
  }
}
