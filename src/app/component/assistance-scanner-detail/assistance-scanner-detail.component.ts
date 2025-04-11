import { AfterViewInit, Component, OnInit, ViewChild, OnChanges } from '@angular/core';
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
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';

@Component({
  selector: 'app-assistance-scanner-detail',
  standalone: false,
  templateUrl: './assistance-scanner-detail.component.html',
  styleUrl: './assistance-scanner-detail.component.scss'
})
export class AssistanceScannerDetailComponent implements OnInit, AfterViewInit {
  
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  showAddPeriod = false;
  showImg = false;
  assistance:any;
  showFormError =false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    id: 'Id',
    assistanceSignDate: 'Fecha Citación',
    recordType: 'Tipo de Registro',
    identification: 'Identificación del Beneficiario',
    identificationType: 'Tipo de Identificación del Beneficiario',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
  };
  
  selectedIds: number[] = [];
  recordsTableColumns: string[] = [];
  displayedColumns: string[] = [];
  
  periods: any;
  isFormVisible = false;
  surveyId: any = {};
  assistanceScannerId:number;
  user: any = {};
  isData: boolean = false;
  groupComponentId = localStorage.getItem('componentId');
  backRoute = `app/survey`;
  
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  
  loading = false;
  totalSize = 0;
  groupComponentDateActivityBeneficiary: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private paginatorService: PaginatorService,
    private _assistanceScannerBeneficiaryService : AssistanceScannerBeneficiaryService,
    private _groupComponentDateActivityBeneficiaryServiceService: GroupComponentDateActivityBenefiaryService
  ) {
    this.recordsTableColumns = Object.keys(this.columns).filter(col => col !== 'actions' && col !== 'select');
    this.displayedColumns = ['select', ...this.recordsTableColumns]; // Acciones primero, luego checkbox y demás columnas
    this.titleService.setTitle('Actividades');
    this.assistanceScannerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.groupComponentDateActivityBeneficiary = {
      userId: this.surveyId,
      pageIndex: 0,
      pageSize: 10, 
    }
    this.getAll()
  }

  closeModal(event:any){
    this.showFormError = event;
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

  showImage(){
    this.showImg = !this.showImg;
  }

  getAll(){
    this._assistanceScannerBeneficiaryService.findByAssistanceScannerId(this.assistanceScannerId).subscribe({
      next: (response: any) => {
        this.dataSource.data = response;
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

  create() {
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

  getRowBorderColor(): string {
    return '!bg-green-200';
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
  
    async removeIds() {
      const result = await Swal.fire({
        title: '¿Estás seguro que deseas eliminar estos días de asistencia?',
        text: '¡No es posible deshacer esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrarlo!',
        cancelButtonText: 'No, conservarlo',
      });
      if (result.value) {
        this._groupComponentDateActivityBeneficiaryServiceService.deleteIds(this.selectedIds).subscribe({
          next: () => {
            this.ngOnInit();
            this.getAll();
            Swal.fire('¡Borrado!', 'Los días de asistencia han sido eliminado.', 'success');
          },
          error: (error: any) =>{
            Swal.fire('Cancelado', 'No se han eliminado los días de asistencia', 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se han eliminado los días de asistencia', 'error');
      }
    }

    async goToSheet(id: number) {
      const result = await Swal.fire({
        title: '¿Estás seguro que deseas ir a la hoja de asistencia?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, ir a la hoja de asistencia!',
        cancelButtonText: 'No, conservarlo',
      });
      if (result.value) {
        this.router.navigateByUrl(`/app/assistance-scanner-beneficiary/${id}`);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se ha eliminado el día de asistencia', 'error');
      }
    }
}
