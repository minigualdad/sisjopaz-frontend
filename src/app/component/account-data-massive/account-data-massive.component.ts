import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-data-massive',
    standalone: false,
    templateUrl: './account-data-massive.component.html',
    styleUrl: './account-data-massive.component.scss'
})
export class AccountDataMassiveComponent {

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
            .uploadAccountCertificationLoaded(this.form.get('file')?.value)
            .subscribe((response: any) => {
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'cuentasCargadas.xlsx';
                link.click();
                window.URL.revokeObjectURL(url);
                this.loading = false;
            });
        await this.router.navigateByUrl('/app/account-certification');
    }

    file: any;
    async fileChange(event: any) {
        this.file = event.target.files[0];
        this.form.get('file')?.setValue(this.file);
    }

    download() {
        this.loading = true;
        this.surveyService.downloadAccountCertificationLoaded().subscribe({
            next: (response: Blob) => {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'jovenes_pendientes_datos_cuenta.xlsx';
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

    openInput() {
        this.fileInput.nativeElement.click();
    }
}
