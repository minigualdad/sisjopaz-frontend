import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surver-massive-update',
  standalone: false,
  templateUrl: './surver-massive-update.component.html',
  styleUrl: './surver-massive-update.component.scss'
})
export class SurverMassiveUpdateComponent {
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
        this.surveyService.uploadUpdateExcel(this.form.get('file')?.value).subscribe({
            next: (response: any) => {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'respuesta_update_masivo.xlsx';
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
        await this.router.navigateByUrl('/app/survey')
    }


    async updateById() {
        this.loading = true;
        this.surveyService.uploadUpdateExcelById(this.form.get('file')?.value).subscribe({
            next: (response: any) => {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'respuesta_update_masivo.xlsx';
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
        await this.router.navigateByUrl('/app/survey')
    }
  
    file: any;
    async fileChange(event: any) {
        this.file = event.target.files[0];
        this.form.get('file')?.setValue(this.file);
    }

    download() {
        this.surveyService.donwloadUpdateTemplateExcel().subscribe({
            next: (response: any) => {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'plantilla_update_masivo.xlsx';
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

