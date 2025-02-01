import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { ProfessionalTeamService } from '../../service/professional-team.service';

@Component({
  selector: 'app-professional-team-beneficiary-dps-pending',
  standalone: false,
  templateUrl: './professional-team-beneficiary-dps-pending.component.html',
  styleUrl: './professional-team-beneficiary-dps-pending.component.scss'
})
export class ProfessionalTeamBeneficiaryDpsPendingComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    id: 'Id',
    state: 'Estado',
    DPSCheck: 'Estado DPS',
    DPSCheckDate: 'Fecha Actualización DPS',
    updatedDate: 'Fecha de Actualización',
    name: 'Nombre',
    identificationType: 'Tipo de Identificación',
    identification: 'Identificación',
    bornDate: 'Fecha de Nacimiento',
    createdAt: 'Fecha de Registro'
  };
  recordsTableColumns: string[] = [];

  constructor(
    private surveyService: SurveyService,
    private professionalTeamService: ProfessionalTeamService,
    private titleService: Title,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Pendientes DPS');
  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.getAll();
  }

  /**
  * After view init
  */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void { }

  async getAll() {
    await this.surveyService.getAllByPendingDPS().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.beneficiaries;
      },
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

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }
}
