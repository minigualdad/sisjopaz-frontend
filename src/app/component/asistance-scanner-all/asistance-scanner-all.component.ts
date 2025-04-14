import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';

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

constructor(
  private assistanceScannerService: AssistanceScannerService,
  private titleService: Title,
  public dialog: MatDialog,
  private userService: UserService
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
  this.dataSource.paginator = this.paginator;
}

ngOnDestroy(): void { }

async getAll() {
  await this.assistanceScannerService.getAll().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.assistances;
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
