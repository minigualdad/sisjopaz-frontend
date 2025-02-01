import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { IndexedDbService } from '../../service/indexed-db.service';

@Component({
  selector: 'app-professional-team-beneficiary-accepted',
  standalone: false,
  templateUrl: './professional-team-beneficiary-accepted.component.html',
  styleUrl: './professional-team-beneficiary-accepted.component.scss'
})
export class ProfessionalTeamBeneficiaryAcceptedComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  state: 'Estado',
  updatedDate: 'Fecha de Actualización',
  name: 'Nombre',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación',
  DNPCheck: 'Aprobación DNP',
  DNPCheckDate: 'Fecha Aprobación DNP',
  ARNCheck: 'Aprobación ARN',
  ARNCheckDate: 'Fecha Aprobación ARN',
  DPSCheck: 'Aprobación DPS',
  DPSCheckDate: 'Fecha Aprobación DPS',
  
};
recordsTableColumns: string[] = [];

connectionStatus = false;

constructor(
  private surveyService: SurveyService,
  private titleService: Title,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  private indexedDbService: IndexedDbService,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Jóvenes Validados');
}

/**
* On init
*/
ngOnInit(): void {
      this.connectionStatusCheck();
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

connectionStatusCheck(){
  if (navigator.onLine) {
    this.connectionStatus = true;
  } else {
    this.connectionStatus = false;
  }
}

async getAll() {
  await this.surveyService.getAllByAccepted().subscribe({
      next: async (response: any) => {
          this.dataSource.data = response.beneficiaries;
          if(!this.connectionStatus) {
            await this.indexedDbService.savePendingAgreement(response.beneficiaries);
          }
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
