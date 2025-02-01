import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { GroupService } from '../../service/group.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrl: './group.component.scss',
    standalone: false
})
export class GroupComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  name: 'Nombre',
  point: 'Punto',
  initDate: 'Fecha Inicio',
  observations: 'Observaciones',
  divipola: 'Ciudad / Municipio',
  regionalLink: 'Enlace Regional',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;


constructor(
  private groupService: GroupService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Grupo');
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
  await this.groupService.getAll().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.groups;
      },
  });
}

create() {
  this.router.navigateByUrl('/app/group-add');
}

groupSchedule(id: number) {
  this.router.navigateByUrl(`/app/group-schedule/${id}`);
}

componentGroup(id: number) {
  this.router.navigateByUrl(`/app/component-group/${id}`);
}

dateGroup(id: number) {
  this.router.navigateByUrl(`/app/date-group/${id}`);
}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el grupo?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.groupService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'grupo ha sido eliminado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el grupo', 'error');
  }
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
