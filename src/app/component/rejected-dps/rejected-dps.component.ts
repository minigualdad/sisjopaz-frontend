import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { SurveyService } from '../../service/survey.service';
import { ProfessionalTeamService } from '../../service/professional-team.service';

@Component({
  selector: 'app-rejected-dps',
  standalone:false,
  templateUrl: './rejected-dps.component.html',
  styleUrl: './rejected-dps.component.scss'
})
export class RejectedDPSComponent {
@ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  id: 'Id',
  state: 'Estado',
  DPSCheck: 'Estado DPS',
  DPSCheckDate: 'Fecha Actualización DPS',
  DPSMotive: 'Motivo del Rechazo',
  updatedDate: 'Fecha de Actualización',
  name: 'Nombre',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación',
};
recordsTableColumns: string[] = [];


constructor(
  private surveyService: SurveyService,
  private professionalTeamService: ProfessionalTeamService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('No Validados DPS');
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
  await this.surveyService.getAllByRejectedDPS().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.surveys;
      },
  });
}

download() {

}

massiveValidate(){
  
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
