import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupComponentService } from '../../service/group-component.service';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import { PaginatorService } from '../../service/paginator.service';
import Swal from 'sweetalert2';
import { environment } from '../../../enviroment/enviroment';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';

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
  
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private groupComponentService: GroupComponentService,
    private assistanceScannerBeneficiaryService: AssistanceScannerBeneficiaryService,
    public dialog: MatDialog,
    private _groupComponentDateActivityBeneficiaryServiceService: GroupComponentDateActivityBenefiaryService
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


  getAll(){
    this._groupComponentDateActivityBeneficiaryServiceService.getAllByGroupComponentAndDate(this.groupComponentDateActivityBeneficiary).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.groupComponentDateActivityBeneficiaries;
        this.loadData(response)
        this.loading = false;
        if (this.dataSource.data.length > 0) {
          this.isData = true;
        }
      },
      error: (err: any) => {
        console.error('Error al obtener los ciclos de grupo:', err);
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
    // Puedes realizar una acción, como cargar nuevos datos
  }

  /**
  * After view init
  */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
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
    if(this.monthSelected && this.yearSelected){
      this.groupComponentDateActivityBeneficiary = {
        groupComponentId: this.groupComponent.id,
        month: this.monthSelected,
        year: this.yearSelected,
        pageIndex: 0,
        pageSize: 10, 
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
    this.dataSource.data = this.transformDateActivities(response);
    this.totalSize = response?.total;
    await this.timer(100);
    this.dataSource.sort = this.recordsTableMatSort;
    this.paginator.length = this.totalSize;
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

    checkImage(transaction: any){
      const dateSplitted = transaction.dateActivity.split('-');
      const dateToSend = dateSplitted[0]+'-'+ dateSplitted[1] +'-'+ dateSplitted[2];
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
}
