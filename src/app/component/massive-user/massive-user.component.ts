import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-massive-user',
  standalone: false,
  templateUrl: './massive-user.component.html',
  styleUrl: './massive-user.component.scss'
})
export class MassiveUserComponent {

  form: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  loading = false;

  constructor(
      private surveyService: SurveyService,
      private userService: UserService,
      private router: Router
  ) {
      this.form = new FormGroup({
          file: new FormControl('', [Validators.required]),
      });
  }

  async create() {
    this.loading = true;
    this.userService
        .uploadUserMassive(this.form.get('file')?.value)
        .subscribe({
            next: (response: any) => {
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'usuariosCargados.xlsx';
                link.click();
                window.URL.revokeObjectURL(url);

                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El archivo de usuarios se ha cargado correctamente.',
                    confirmButtonText: 'Aceptar'
                });

                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar el archivo:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el archivo. Inténtalo de nuevo.',
                    confirmButtonText: 'Aceptar'
                });
                this.loading = false;
            }
        });

    await this.router.navigateByUrl('/app/user');
}


  file: any;
  async fileChange(event: any) {
      this.file = event.target.files[0];
      this.form.get('file')?.setValue(this.file);
  }

  download() {
    this.userService.downloadMassiveTemplate().subscribe({
        next: (response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'masivo_usuarios.xlsx';
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
