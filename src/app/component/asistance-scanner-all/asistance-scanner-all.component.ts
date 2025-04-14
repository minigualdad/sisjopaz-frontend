import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import { PaginatorService } from '../../service/paginator.service';

@Component({
  selector: 'app-asistance-scanner-all',
  standalone: false,
  templateUrl: './asistance-scanner-all.component.html',
  styleUrl: './asistance-scanner-all.component.scss'
})
export class AsistanceScannerAllComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  startDay: 'Inicio de la Planilla',
  endDay: 'Fin de la Planilla',
  divipola: 'Ciudad',
  department: 'Departamento',
  group: 'Grupo',
  component: 'Componente',
  state: 'Estado',

};
recordsTableColumns: string[] = [];
user: any;
totalItems = 0;
pageSize = 10;
pageIndex = 0;

loading = false;
totalSize = 0;

constructor(
  private assistanceScannerService: AssistanceScannerService,
  private titleService: Title,
  public dialog: MatDialog,
  private userService: UserService,
  private paginatorService: PaginatorService,
  
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Asistencias');
}

/**
* On init
*/
ngOnInit(): void {
  this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
      this.getAll();
  });
}

/**
* After view init
*/
ngAfterViewInit(): void {
  // Make the data source sortable
  this.dataSource.sort = this.recordsTableMatSort;
  this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
    this.assistanceScannerService.getAll(pageIndex, pageSize).subscribe({
      next: async (response: any) => {
        this.loadData(response);
      },
      error: (err) => {
        console.error("Error en la solicitud: ", err);
      }
    });
  });}

ngOnDestroy(): void { }

async getAll() {
  await this.assistanceScannerService.getAll(0, 10).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.assistances.assistances;
          this.loadData(response);

      },
  });
}

async loadData(response: any) {
  this.dataSource.data = response.assistances.assistances;
  this.totalSize = response?.assistances.total;
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
  this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
}
}
