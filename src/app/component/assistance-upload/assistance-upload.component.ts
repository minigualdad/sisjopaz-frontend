import { Component, OnInit, ViewChild } from '@angular/core';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import { environment } from '../../../enviroment/enviroment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';

@Component({
  selector: 'app-assistance-upload',
  standalone: false,
  templateUrl: './assistance-upload.component.html',
  styleUrl: './assistance-upload.component.scss'
})
export class AssistanceUploadComponent implements OnInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  imagePreview: any | null = null;
  imagePreviewResult: SafeResourceUrl | null = null;
  rotatedImage: File | null = null;   // Imagen rotada
  file: any;
  rotationAngle = 0;
  alert = '';
  loading = false;
  showTableData = false;
  imageLoaded: boolean = false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    identificationType: 'Tipo de documento',
    identification: 'Numero de Documento',
    assistanceSignDate: 'Fechas de Asistencias',
    recordType: "Tipo de Registro",
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
  };
  recordsTableColumns: string[] = [];
  user: any;

  imageUrl: string = '';
  displayedColumns: string[] = [];
  showFormError = false;
  reportForm: FormGroup;
  errorDataSource: any;
  assistanceScannerId:number = 0;

  constructor(private assistanceScannerService: AssistanceScannerService,
    private sanitizer: DomSanitizer,
    private groupComponentDateActivityBeneficiaryService: GroupComponentDateActivityBenefiaryService,
    private route: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.displayedColumns = ['select', ...this.recordsTableColumns, 'actions'];

    this.reportForm = this.fb.group({
      errorDescription: ['', Validators.required],
    });

  }
  ngOnInit(): void {
  }



  formValid(): boolean {
    const valor = !this.reportForm.invalid;
    return !valor;
  }

  get errorDescription() {
    return this.reportForm.get('errorDescription');
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

  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
    this.dataSource.paginator = this.paginator;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleCheckboxesVisibility(): void {
    this.showFormError = !this.showFormError;
  }

  isAllSelected(): boolean {
    return this.dataSource && this.dataSource.data.length > 0 
  }
  // Manejar la selección de un archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar que el archivo sea una imagen
      if (!file.type.startsWith('image/')) {
        this.alert = 'Por favor, selecciona un archivo de imagen.';
        return;
      }

      this.alert = '';

      // Opciones para la compresión de imagen
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      // Comprimir la imagen
      imageCompression(file, options)
        .then((compressedFile) => {
          this.file = compressedFile;
          // Crear la URL para previsualización
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreview = reader.result as string;
          };
          reader.readAsDataURL(compressedFile);
          // Reiniciar el ángulo de rotación
          this.rotationAngle = 0;
        })
        .catch((error) => {
          console.error('Error al comprimir la imagen:', error);
          this.alert = 'Ocurrió un error al procesar la imagen. Intenta con otra.';
        });
    }
  }


  // Rotar la imagen hacia la izquierda
  rotateLeft() {
    this.rotationAngle -= 90;
    this.applyRotation();
  }

  // Rotar la imagen hacia la derecha
  rotateRight() {
    this.rotationAngle += 90;
    this.applyRotation();
  }

  // Aplicar la rotación a la imagen
  private applyRotation() {
    if (!this.imagePreview || !this.file) return;

    const img = new Image();
    img.src = this.imagePreview;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Ajustar el tamaño del canvas para rotar correctamente
      if (this.rotationAngle % 180 !== 0) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      // Rotar la imagen
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((this.rotationAngle * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      // Actualizar previsualización y archivo rotado
      this.imagePreview = canvas.toDataURL('image/jpeg');
      canvas.toBlob((blob) => {
        if (blob) {
          this.rotatedImage = new File([blob], this.file!.name, { type: this.file!.type });
        }
      }, this.file.type);
    };
  }

  newAssistance() {
    window.location.reload();
  }

  report() {
    Swal.fire({
      title: '¿Deseas reportar un error?',
      text: 'Saldrás de esta pantalla para especificar el error encontrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reportar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showFormError = true;
      }
    });
  }

  getDisplayedColumns(): string[] {
    return this.showFormError
      ? ['select', ...this.recordsTableColumns, 'actions']
      : [...this.recordsTableColumns, 'actions'];
  }

  closeModal() {
    this.showFormError = false;
    this.reportForm.reset();
  }

  // Simular la subida de la imagen
  uploadImage() {
    let file = this.file
    if (this.rotatedImage) {
      file = this.rotatedImage;
    }
    this.loading = true;
    this.assistanceScannerService.uploadFile(file)
      .subscribe({
        next: (response: any) => {
          this.showTableData = true;
          this.dataSource.data = this.transformDateActivities(response);
          const imageResult = `${environment.apiUrl}/${response?.response?.imageResult}`;
          this.imageUrl = imageResult
          this.imagePreviewResult = this.sanitizer.bypassSecurityTrustResourceUrl(imageResult);
          this.loading = false;
          this.imageLoaded = true;
          // this.imagePreview = null;
          Swal.fire('Correcto', 'Las planillas de Asistencia han sido cargadas correctamente', 'success');
        },
        error: (error: any) => {

          this.loading = false;
          Swal.fire('Advertencia', `Algo ha fallado, por favor revise la consistencia de la planilla. ${error?.error?.message}`, 'warning');
        }
      });

  }

  transformDateActivities(data: any) {
    const daysOfWeek = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    this.assistanceScannerId = Number(data.response.assistanceScannerBeneficiaries[0].assistanceScannerId);
    return data.response.assistanceScannerBeneficiaries.map((activity: any) => {
      const date = new Date(activity.assistanceSignDate + "T00:00:00Z");
      const day = daysOfWeek[date.getUTCDay()];
      const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);

      return {
        ...activity,
        assistanceSignDate: `${activity.assistanceSignDate} - ${formattedDay}`,

      };
    });
  }

  redirectTo(url: string) {
    this.route.navigateByUrl(url)
  }

}
