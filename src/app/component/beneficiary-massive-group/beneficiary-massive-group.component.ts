import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import { Router } from '@angular/router';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-beneficiary-massive-group',
  standalone: false,
  templateUrl: './beneficiary-massive-group.component.html',
  styleUrl: './beneficiary-massive-group.component.scss'
})
export class BeneficiaryMassiveGroupComponent {

  form: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  loading = false;

  constructor(
      private surveyService: SurveyService,
      private groupService: GroupService,
      private router: Router
  ) {
      this.form = new FormGroup({
          file: new FormControl('', [Validators.required]),
      });
  }

  getGroupInfo(){
    this.groupService.downloadGroupInfo().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Directrio_de_grupos.xlsx';
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

  async create() {
      this.loading = true;
      this.surveyService
          .uploadGroupAssignation(this.form.get('file')?.value)
          .subscribe((response: any) => {
              const url = window.URL.createObjectURL(response);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'beneficiarios_cargados_a_grupos.xlsx';
              link.click();
              window.URL.revokeObjectURL(url);
              this.loading = false;
          });
          await this.router.navigateByUrl('/app/group')
  }

  file: any;
  async fileChange(event: any) {
      this.file = event.target.files[0];
      this.form.get('file')?.setValue(this.file);
  }

  download() {
    this.surveyService.downloadWithoutGroup().subscribe({
        next: (response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'beneficiarios_sin_grupo.xlsx';
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
