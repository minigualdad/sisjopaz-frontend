import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator'; 
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-users-admin',
    templateUrl: './users-admin.component.html',
    styleUrls: ['./users-admin.component.scss'],
    standalone: false
})
export class UsersAdminComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  name: 'Nombre',
  role: 'Rol',
  email: 'Correo Electrónico',
  contactPhone: 'Teléfono de Contacto',
  divipolaId: 'Municipio del Enlace',
  linkageType: 'Tipo de Vinculación (UT/OPS).',
  identificationType: 'Tipo de Identificación',
  identification: 'Número de Documento',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
searchValue: string = ''; 
totalItems = 0;  
pageSize = 10;   
pageIndex = 0;   

loading = false;
totalSize = 0;



constructor(
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Usuarios');
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

translateState(state: string): string {
  switch (state) {
    case 'ENABLED':
      return 'Activo';
    case 'DISABLED':
      return 'Inactivo';
    case 'BLOCKED':
      return 'Bloqueado';
    default:
      return state;
  }
}

async getAll() {
  await this.userService.getUsers().subscribe({
    next: (response: any) => {
      this.dataSource.data = response.users.map((user: any) => ({
        ...user,
        state: this.translateState(user.state),
      }));
    },
  });
}

searchByFilter() {
  this.userService.filterByWord(this.searchValue).subscribe({
    next: (response: any) => {
      this.dataSource.data = response.users;
      this.loadData(response);
      },
  })
}

async loadData(response: any) {
  this.dataSource.data = response.users;
  this.totalSize = response?.total;
  await this.timer(100);
  this.dataSource.sort = this.recordsTableMatSort;
  this.paginator.length = this.totalSize;
  this.loading = false;
}

timer(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

create() {
  this.router.navigateByUrl('/app/user-add');
}



userMassive() {
  this.router.navigateByUrl('/app/user-massive');
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

applyFilter(event: any) {
  this.searchValue = event.target.value.trim().toLowerCase();
}
}
