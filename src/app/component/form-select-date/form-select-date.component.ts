import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-form-select-date',
  standalone: false,
  templateUrl: './form-select-date.component.html',
  styleUrl: './form-select-date.component.scss'
})
export class FormSelectDateComponent {
  months: { value: number; name: string }[] = [];
  years: number[] = [];
  monthSelected: any;
  yearSelected: any;
  loading: boolean = false;
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormSelectDateComponent>,
    private groupComponentDateActivityBeneficiaryService: GroupComponentDateActivityBenefiaryService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
      this.initializeMonthYearOptions();
    });
  }

  async onSelectYearMonth(event: any) {
    this.monthSelected = event.month;
    this.yearSelected = event.year;
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
    if (this.data) {
      this.loading = true;
      const month = this.monthSelected;
      const year = this.yearSelected;
      const data = { period: `${year}-${month}`, groupId: this.data.id };
      this.groupComponentDateActivityBeneficiaryService.assistanceBenficiariesByGroup(data).subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Asistencia-${year}-${month}.xlsx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);

          Swal.fire({
            icon: 'success',
            title: 'Descarga completada',
            text: 'El archivo se descargó correctamente.',
            confirmButtonText: 'Continuar',
          }).then(() => {
            this.loading = false;
            this.dialogRef.close();
          });
        },
        error: (error) => {
          processBlobAndShowSwal(error.error)
            .then()
            .catch((error) => {
              Swal.fire({
                icon: 'warning',
                title: 'No se pudo generar el archivo',
                text: `Ocurrió un problema durante la descarga. No determinado`,
                confirmButtonText: 'Intentar nuevamente',
              });
            });
          this.loading = false;
        },
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Este proceso puede tardar',
        text: 'Dependiendo de la cantidad de datos, la descarga podría demorar. ¿Deseas continuar?',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          const month = this.monthSelected;
          const year = this.yearSelected;
          const data = { period: `${year}-${month}` };
          this.groupComponentDateActivityBeneficiaryService.assistanceBenficiariesAll(data).subscribe({
            next: (response: Blob) => {
              const url = window.URL.createObjectURL(response);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Asistencia-${year}-${month}.xlsx`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              this.loading = false;
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
                .then()
                .catch((error) => {
                  Swal.fire({
                    icon: 'warning',
                    title: 'No se pudo generar el archivo',
                    text: `Ocurrió un problema durante la descarga. No determinado`,
                    confirmButtonText: 'Intentar nuevamente',
                  });
                });
              this.loading = false;
            },
          });
        }
      });
    }
  }

  onSubmitRegionalLink(): void {
    Swal.fire({
      icon: 'info',
      title: 'Este proceso puede tardar',
      text: 'Dependiendo de la cantidad de datos, la descarga podría demorar. ¿Deseas continuar?',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const month = this.monthSelected;
        const year = this.yearSelected;
        const data = { period: `${year}-${month}` };
        this.groupComponentDateActivityBeneficiaryService.assistanceBenficiariesByRegion(data).subscribe({
          next: (response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Asistencia-${year}-${month}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            this.loading = false;
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
              .then()
              .catch((error) => {
                Swal.fire({
                  icon: 'warning',
                  title: 'No se pudo generar el archivo',
                  text: `Ocurrió un problema durante la descarga. No determinado`,
                  confirmButtonText: 'Intentar nuevamente',
                });
              });
            this.loading = false;
          },
        });
      }
    });
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

