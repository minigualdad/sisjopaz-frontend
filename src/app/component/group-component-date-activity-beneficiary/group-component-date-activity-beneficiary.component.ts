import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupComponentService } from '../../service/group-component.service';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';

@Component({
  selector: 'app-group-component-date-activity-beneficiary',
  standalone: false,
  templateUrl: './group-component-date-activity-beneficiary.component.html',
  styleUrl: './group-component-date-activity-beneficiary.component.scss'
})
export class GroupComponentDateActivityBeneficiaryComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private groupComponentService: GroupComponentService,
    public dialog: MatDialog,
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
  getAll(groupComponentDateActivityBeneficiary: any){
    this._groupComponentDateActivityBeneficiaryServiceService.getAllByGroupComponentAndUser(groupComponentDateActivityBeneficiary).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.groupComponentDateActivityBeneficiaries;
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

  /**
  * After view init
  */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
    this.dataSource.paginator = this.paginator;
  }

  async onSelectSurvey(event: any) {
    this.user.id = event.id;
    let groupComponentDateActivityBeneficiary = {
      userId: this.user.id,
      groupComponentId: this.groupComponent.id
    }
    await this.getAll(groupComponentDateActivityBeneficiary);
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
}
