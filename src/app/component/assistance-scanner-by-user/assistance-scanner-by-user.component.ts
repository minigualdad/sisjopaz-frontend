import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-assistance-scanner-by-user',
  standalone: false,
  templateUrl: './assistance-scanner-by-user.component.html',
  styleUrl: './assistance-scanner-by-user.component.scss'
})
export class AssistanceScannerByUserComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  group: 'Grupo',
  starDay: 'Fecha de Inicio',
  endDay: 'Fecha de Fin',
  date: 'Fecha de Carga',
  component: 'Componente',
  divipola: 'Ciudad',
  department: 'Departamento',

  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
group: any = {};


constructor(
  private assistanceScannerService: AssistanceScannerService,
  private titleService: Title,
  public dialog: MatDialog,
  private userService: UserService,
  private activatedRoute: ActivatedRoute,
  private groupService: GroupService,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Mis Planillas');
  this.group.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
}

/**
* On init
*/
ngOnInit(): void {
  this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
      this.getAll();
      this.getGroupInfo();
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
  await this.assistanceScannerService.getAllByUser(this.group.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.assistanceScanners;
      },
  });
}

getGroupInfo(){
this.groupService.show(this.group.id).subscribe({
  next: (response: any) => {
      this.group = response.group;
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
