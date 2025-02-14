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


@Component({
  selector: 'app-group-component-date-activity-beneficiary',
  standalone: false,
  templateUrl: './group-component-date-activity-beneficiary.component.html',
  styleUrl: './group-component-date-activity-beneficiary.component.scss'
})
export class GroupComponentDateActivityBeneficiaryComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
  @ViewChild(MatSort) sort!: MatSort;

  showAddPeriod = false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    groupComponent: 'Componente',
    groupCycleId: 'Ciclo - Periodo',
    dateActivity: 'Fecha Citación',
    hasAssitence: 'Asistencía',
    user: 'Beneficiario',
    userIdentification: 'Identificación del Beneficiario',
    userIdentificationType: 'Tipo de Identificación del Beneficiario',
    state: 'Estado',
  };
  recordsTableColumns: string[] = [];
  periods: any;
  isFormVisible = false;
  groupComponent: any = {};
  user: any = {};
  isData: boolean = false;

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
    private groupComponentService: GroupComponentService,
    public dialog: MatDialog,
    private paginatorService: PaginatorService,
    private _groupComponentDateActivityBeneficiaryServiceService: GroupComponentDateActivityBenefiaryService
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Actividades');
    this.groupComponent = {};
    this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.showGroupComponent();
  }
  getAll(){
    this._groupComponentDateActivityBeneficiaryServiceService.getAllByGroupComponentAndUser(this.groupComponentDateActivityBeneficiary).subscribe({
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
        userId: this.user.id,
        groupComponentId: this.groupComponent.id,
        pageIndex: event.pageIndex,
        pageSize: event.pageSize, 
      }
      await this._groupComponentDateActivityBeneficiaryServiceService.getAllByGroupComponentAndUser(this.groupComponentDateActivityBeneficiary).subscribe({
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


  async onSelectSurvey(event: any) {
    this.user.id = event.id;
    this.groupComponentDateActivityBeneficiary = {
      userId: this.user.id,
      groupComponentId: this.groupComponent.id,
      pageIndex: 0,
      pageSize: 10, 
    }
    await this.getAll();
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
    this.dataSource.data = response.groupComponentDateActivityBeneficiaries;
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
  redirectByPeriod(periodId: number) {
    this.router.navigateByUrl(`app/period/${periodId}`)
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
  
}
