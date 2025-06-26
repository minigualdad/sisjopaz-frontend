import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupComponentService } from '../../service/group-component.service';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import Swal from 'sweetalert2';
import { environment } from '../../../enviroment/enviroment';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';
import { GroupComponentSheetService } from '../../service/group-component-sheet.service';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-attendances-by-month',
  standalone: false,
  templateUrl: './attendances-by-month.component.html',
  styleUrl: './attendances-by-month.component.scss'
})
export class AttendancesByMonthComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
  @ViewChild(MatSort) sort!: MatSort;

  showAddPeriod = false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    select: 'Selección', // Asegurar que el nombre sea 'select'
    id: 'Id',
    groupComponent: 'Componente',
    dateActivity: 'Fecha Citación',
    hasAssitence: 'Asistencía',
    user: 'Beneficiario',
    userIdentification: 'Identificación del Beneficiario',
    userIdentificationType: 'Tipo de Identificación del Beneficiario',
    state: 'Estado',
  };

  selectedIds: number[] = [];
  recordsTableColumns: string[] = [];
  displayedColumns: string[] = [];

  periods: any;
  isFormVisible = false;
  groupComponent: any = {};
  user: any = {};
  isData: boolean = false;
  groupComponentId = localStorage.getItem('componentId');
  backRoute = `app/component-group/${this.groupComponentId}`;

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  loading = false;
  totalSize = 0;
  groupComponentDateActivityBeneficiary: any;
  monthSelected: any;
  yearSelected: any;
  server: any = environment.apiUrl + '/app/survey/files/';
  imageLoaded: boolean = false;
  dataForUpdate: any = {};
  imagePreview: any | null = null;
  imagePreviewResult: SafeResourceUrl | null = null;
  rotatedImage: File | null = null;
  file: any;
  rotationAngle = 0;
  imageUrl: any;
  message = 'Certifico que he verificado las planillas de asistencia firmadas y cuento con el soporte físico correspondiente de las asistencias del beneficiario. Dicho soporte ha sido digitalizado o intentado cargar previamente en la plataforma SISJOPAZ o, en su defecto, enviado al Ministerio. En consecuencia de lo anterior, procedo a realizar el ajuste de la planilla de asistencia.';
  alert = ';'
  reload: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private sanitizer: DomSanitizer,
    private groupComponentService: GroupComponentService,
    private assistanceScannerBeneficiaryService: AssistanceScannerBeneficiaryService,
    public dialog: MatDialog,
    private _groupComponentDateActivityBeneficiaryServiceService: GroupComponentDateActivityBenefiaryService,
    private groupComponentSheetService: GroupComponentSheetService,
  ) {
    this.recordsTableColumns = Object.keys(this.columns).filter(col => col !== 'actions' && col !== 'select');
    this.displayedColumns = ['actions', 'select', ...this.recordsTableColumns]; // Acciones primero, luego checkbox y demás columnas
    this.titleService.setTitle('Asistencias');
    this.groupComponent = { id: this.activatedRoute.snapshot.paramMap.get('id') };
  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.showGroupComponent();
  }

  toggleSelection(id: number) {
    const index = this.selectedIds.indexOf(id);
    if (index === -1) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds.splice(index, 1);
    }
  }

  // Manejar selección de todos los elementos


  async getAll() {
    this.loading = true;
    await this._groupComponentDateActivityBeneficiaryServiceService.getAllByGroupComponentAndDate(this.groupComponentDateActivityBeneficiary).subscribe({
      next: async (response: any) => {
        this.loading = false;

        if (!response.groupComponentDateActivityBeneficiaries || response.groupComponentDateActivityBeneficiaries.length === 0) {
          await Swal.fire({
            title: 'No hay datos',
            text: 'No hay datos de la fecha seleccionada, por favor seleccione otra e intente de nuevo.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
          return; // Detiene aquí si no hay datos
        }
        this.dataSource.data = this.transformDatesToSend(response)
        this.loadData(response);
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
    });
  }

  showGroupComponent() {
    this.groupComponentService.show(this.groupComponent.id)
      .subscribe((response: any) => {
        this.groupComponent = response.groupComponent;
        this.groupComponent.group = response.groupComponent.Group?.name;
        this.groupComponent.component = response.groupComponent.Component?.name;
      })
  }

  create() {
    this.router.navigateByUrl(`/app/group-component-date-activity-beneficiary-add/${this.groupComponent.id}`);
  }

  async onPageChange(event: PageEvent) {
    this.loading = true;
    this.groupComponentDateActivityBeneficiary = {
      groupComponentId: this.groupComponent.id,
      month: this.monthSelected,
      year: this.yearSelected,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    }
    await this._groupComponentDateActivityBeneficiaryServiceService.getAllByGroupComponentAndDate(this.groupComponentDateActivityBeneficiary).subscribe({
      next: async (response: any) => {
        this.loading = false;
        this.loadData(response);
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
    });
  }

  /**
  * After view init
  */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
  }

  transformDatesToSend(data: any) {
    const groupedData: any = {};

    data.groupComponentDateActivityBeneficiaries?.forEach((item: any) => {
      const user = item.UserId;
      const id = user?.identification;

      if (!groupedData[id]) {
        groupedData[id] = {
          id: user?.id,
          identification: user?.identification,
          identificationType: user?.identificationType,
          firstName: user?.firstName,
          secondName: user?.secondName,
          firstLastName: user?.firstLastName,
          secondLastName: user?.secondLastName,
          name: user?.firstName,
          dates: [],
          recordType: item.recordType || null,
          plainDate: item.dateActivity,
          hasAssistance: item.hasAssitence == 'ASISTIÓ' ? true : false
        };
      }
      const dateParts = item.dateActivity.split('-');
      const year = Number(dateParts[0]);
      const month = Number(dateParts[1]) - 1;
      const day = Number(dateParts[2]);
      const dateObj = new Date(year, month, day);
      const dayOfWeek = dateObj.toLocaleDateString('es-ES', { weekday: 'long' });
      const formattedDate = `${item.dateActivity} (${dayOfWeek})`;
      const alreadyExists = groupedData[id].dates.some((d: any) => d.date === formattedDate);
      if (!alreadyExists) {
        groupedData[id].dates.push({
          date: formattedDate,
          hasAssistance: item.hasAssitence == 'ASISTIÓ' ? true : false,
        });
      }
    });

    const groupedArray = Object.values(groupedData);

    groupedArray.forEach((item: any) => {
      item.dates.sort((a: any, b: any) => {
        const dateA = new Date(a.date.split(' ')[0]);
        const dateB = new Date(b.date.split(' ')[0]);
        return dateA.getTime() - dateB.getTime();
      });
    });

    groupedArray.sort((a: any, b: any) => {
      const aFirst = a.firstLastName?.toLowerCase() || '';
      const bFirst = b.firstLastName?.toLowerCase() || '';

      if (aFirst < bFirst) return -1;
      if (aFirst > bFirst) return 1;

      const aSecond = a.secondLastName?.toLowerCase() || '';
      const bSecond = b.secondLastName?.toLowerCase() || '';

      if (aSecond < bSecond) return -1;
      if (aSecond > bSecond) return 1;

      return 0;
    });

    return groupedArray;
  }



  transformDateActivities(data: any) {
    const daysOfWeek = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    return data.groupComponentDateActivityBeneficiaries.map((activity: any) => {
      const date = new Date(activity.dateActivity + "T00:00:00Z");
      const day = daysOfWeek[date.getUTCDay()];
      const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
      return {
        ...activity,
        dateActivity: `${activity.dateActivity} - ${formattedDay}`
      };
    });
  }

  async onSelectYearMont(event: any) {
    this.monthSelected = event.month;
    this.yearSelected = event.year;
    if (this.monthSelected && this.yearSelected) {
      this.groupComponentDateActivityBeneficiary = {
        groupComponentId: this.groupComponent.id,
        month: this.monthSelected,
        year: this.yearSelected,
        pageIndex: 0,
        pageSize: 100000,
      }
      await this.getAll();
    }
  }

  /**
  * Track by function for ngFor loops
  *
  * @param index
  * @param item
  */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  reciveEvent(event: any) {
    this.isFormVisible = event
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  async loadData(response: any) {
    this.dataSource.data = this.transformDatesToSend(response);
    this.totalSize = response?.total;
    await this.timer(100);
    this.dataSource.sort = this.recordsTableMatSort;
    this.loading = false;
  }

  timer(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }

  handlePeriods(emittedPeriods: any) {
    if (Array.isArray(emittedPeriods) && emittedPeriods.length > 0) {
      this.dataSource.data = emittedPeriods; // Asignar datos a la tabla
      this.isFormVisible = false; // Ocultar el formulario
    } else {
      console.warn('No se recibieron períodos válidos:', emittedPeriods);
    }
  }

  getRowBorderColor(hasAssitence: string | null | undefined): string {
    if (!hasAssitence || hasAssitence.trim().toLowerCase() === '') {
      return '!bg-red-200'; // Fondo rojo cuando el valor es null o vacío
    } else if (hasAssitence.trim().toLowerCase() === 'si' || hasAssitence.trim().toLowerCase() === 'asistió') {
      return '!bg-green-200'; // Fondo verde si asistió
    } else {
      return '!bg-red-200'; // Si no coincide, también rojo
    }
  }

  async remove(id: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el día de asistencia?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
    });
    if (result.value) {
      this._groupComponentDateActivityBeneficiaryServiceService.delete(id).subscribe({
        next: () => {
          this.ngOnInit();
          this.getAll();
          Swal.fire('¡Borrado!', 'Día de asistencia ha sido eliminado.', 'success');
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el día de asistencia', 'error');
    }
  }

  checkImage(transaction: any) {
    const dateSplitted = transaction.dateActivity.split('-');
    const dateToSend = dateSplitted[0] + '-' + dateSplitted[1] + '-' + dateSplitted[2];
    let url = '';
    const data = {
      userId: transaction.userId,
      assistanceSignDate: dateToSend
    }
    this.assistanceScannerBeneficiaryService.showByUserIdAndDate(data)
      .subscribe((response: any) => {
        url = this.server + response.assistanceScannerBeneficiary.AssistanceScanner?.urlFileImageProcessed;
        if (url) {
          window.open(url, '_blank'); // Abre el documento en una nueva pestaña
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Sin planilla',
            text: 'No se encontró una planilla cargada para esta fecha.',
            confirmButtonText: 'Aceptar'
          });
        }
      }, (error) => {
        // También puedes capturar errores de red o del backend
        console.error('Error al obtener la información:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontró una planilla cargada para esta fecha',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  handleRemove(event: { record: any, date: string }) {
    const cleanDate = event.date.split(' ')[0];
    this.dataForUpdate = {
      groupComponentId: this.groupComponent.id,
      dateActivity: cleanDate,
      hasAssistance: true,
      userId: event.record.id,
    };
    Swal.fire({
      title: 'Certificación',
      text: this.message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Certificar Asistencia',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Confirmación',
          text: '¿Está seguro de que desea modificar la asistencia? Esta operación quedará certificada.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, modificar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateAssistance();
          } else {
            Swal.fire('Cancelado', 'No se ha modificado la asistencia', 'info');
          }
        });
      } else {
        Swal.fire('Cancelado', 'No se ha modificado la asistencia', 'info');
      }
    });
  }

  handleAdd(event: { record: any, date: string }) {
    const cleanDate = event.date.split(' ')[0];
    this.dataForUpdate = {
      groupComponentId: this.groupComponent.id,
      dateActivity: cleanDate,
      hasAssistance: false,
      userId: event.record.id,
    };
    Swal.fire({
      title: 'Certificación',
      text: this.message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Certificar Asistencia',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Confirmación',
          text: '¿Está seguro de que desea modificar la asistencia? Esta operación quedará certificada.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, modificar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateAssistance();
          } else {
            Swal.fire('Cancelado', 'No se ha modificado la asistencia', 'info');
          }
        });
      } else {
        Swal.fire('Cancelado', 'No se ha modificado la asistencia', 'info');
      }
    });
  }

  async updateAssistance() {
    // this.loading = true;
    await this._groupComponentDateActivityBeneficiaryServiceService.updateAssistance(this.dataForUpdate).subscribe({
      next: async (response: any) => {
        this.dataSource.data.forEach((item: any) => {
          if (item.id == this.dataForUpdate.userId) {
            item.dates.forEach((date: any) => {
              if (date.date.split(' ')[0] == this.dataForUpdate.dateActivity) {
                date.hasAssistance = !this.dataForUpdate.hasAssistance;
              }
            });
          }
        });
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo modificar la asistencia, por favor intente de nuevo.',
          confirmButtonText: 'Aceptar'
        });
        console.error("Error en la solicitud: ", err);
      }
    });
  }

  uploadImage() {
    let file = this.file
    if (this.rotatedImage) {
      file = this.rotatedImage;
    }
    this.loading = true;
    const data = {
      sheet: file,
      groupComponentId: this.groupComponent.id
    }
    this.groupComponentSheetService.create(data)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Planilla cargada correctamente', 'success');
          this.loading = false;
          this.imagePreview = false;
          this.reload = true;


        },
        error: (error: any) => {
          console.error(error);
          Swal.fire({
            title: 'Operación incorrecta',
            text: `No se ha podido cargar la planilla`,
            icon: 'error',
          });
          this.loading = false;
          this.imagePreview = false;
        }
      });

  }

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
}
