import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { PaginatorService } from '../../service/paginator.service';

@Component({
  selector: 'app-professional-team-beneficiary-dnp-pending',
  standalone: false,
  templateUrl: './professional-team-beneficiary-dnp-pending.component.html',
  styleUrl: './professional-team-beneficiary-dnp-pending.component.scss'
})
export class ProfessionalTeamBeneficiaryDnpPendingComponent implements OnInit, AfterViewInit  {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
@ViewChild(MatSort) sort!: MatSort;

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
isData: boolean = false;

totalItems = 0;
pageSize = 10;
pageIndex = 0;

loading = false;
totalSize = 0;
searchValue: string = '';

constructor(
  private surveyService: SurveyService,
  private titleService: Title,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  private paginatorService: PaginatorService,
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
  this.loading = true;
  this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
    this.surveyService.getAllByPendingDNP(pageIndex, pageSize).subscribe({
      next: async (response: any) => {
        this.loading = false;
        this.loadData(response);
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
    });
  });
}

ngOnDestroy(): void { }

async getAll() {
  await this.surveyService.getAllByPendingDNP(0,10).subscribe({
    next: (response: any) => {
      this.dataSource.data = response.surveys;
      this.loadData(response)
      this.loading = false;
      if (this.dataSource.data.length > 0) {
        this.isData = true;
      }
    },
    error: (err) => {
      this.loading = false;
      console.error("Error en la solicitud: ", err);
    }
  });
}

searchByFilter() {
  this.surveyService.filterByWord(this.searchValue, 19).subscribe({
    next: (response: any) => {
      this.dataSource.data = response.surveys;
      this.loadData(response);
    },
  })
}

async loadData(response: any) {
  this.dataSource.data = response.surveys;
  this.totalSize = response?.total;
  await this.timer(100);
  this.dataSource.sort = this.recordsTableMatSort;
  this.paginator.length = this.totalSize;
  this.loading = false;
}

timer(ms: number) {
  return new Promise(res => setTimeout(res, ms));
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
  this.searchValue = filterValue.target.value.trim().toLowerCase();
}


}
