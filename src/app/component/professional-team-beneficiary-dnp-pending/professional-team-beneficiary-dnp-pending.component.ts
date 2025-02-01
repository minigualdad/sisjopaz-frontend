import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
@Component({
  selector: 'app-professional-team-beneficiary-dnp-pending',
  standalone: false,
  templateUrl: './professional-team-beneficiary-dnp-pending.component.html',
  styleUrl: './professional-team-beneficiary-dnp-pending.component.scss'
})
export class ProfessionalTeamBeneficiaryDnpPendingComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  id: 'Id',
  stateAgreement: 'Estado',
  DNPCheck: 'Validación DNP',
  DNPCheckDate: 'Fecha Validación DNP',
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
  private titleService: Title,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Pendientes DNP');
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
  await this.surveyService.getAllByPendingDNP().subscribe({
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
