import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';
import { environment } from '../../../enviroment/enviroment';

@Component({
  selector: 'app-assistance-scanner-beneficiary',
  standalone: false,
  templateUrl: './assistance-scanner-beneficiary.component.html',
  styleUrl: './assistance-scanner-beneficiary.component.scss'
})
export class AssistanceScannerBeneficiaryComponent {
@ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  assistanceSignDate: 'Fecha de Planilla',
  name: 'Nombre',
  identification: 'Número de Identificación',
  identificationType: 'Tipo de Identificación',
};
recordsTableColumns: string[] = [];
user: any;
server: any = environment.apiUrl + '/app/survey/files/';
survey: any = {};
constructor(
  private assistanceScannerBeneficiaryService: AssistanceScannerBeneficiaryService,
  private titleService: Title,
  public dialog: MatDialog,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Histórico Planillas');
}

/**
* On init
*/
ngOnInit(): void {
  this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
  });
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
  await this.assistanceScannerBeneficiaryService.getAllById(this.survey.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.beneficiaryAssistances;
      },
  });
}

checkImage(id: any){
  let newId = id-1;
  const url = this.server + this.dataSource.data[newId].urlFileImageProcessed;
  if (url) {
    window.open(url, '_blank'); // Abre el documento en una nueva pestaña
  } else {
    console.error('No se encontró una URL válida para el documento.');
  }
}

checkOriginalImage(id: any){
  let newId = id-1;
  const url = this.server + this.dataSource.data[newId].urlFileImageOriginal;
  if (url) {
    window.open(url, '_blank'); // Abre el documento en una nueva pestaña
  } else {
    console.error('No se encontró una URL válida para el documento.');
  }
}

async onSelectSurvey(event: any){
  this.survey.id = event.id;
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

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
