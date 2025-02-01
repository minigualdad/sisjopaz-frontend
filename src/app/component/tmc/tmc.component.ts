import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentService } from '../../service/component.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tmc',
  standalone:false,
  templateUrl: './tmc.component.html',
  styleUrl: './tmc.component.scss'
})
export class TMCComponent {
@ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  id: 'Id',
  name: 'Nombre',
  entityResponsibleName: 'Entidad Responsable',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;


constructor(
  private componentService: ComponentService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Componentes');
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
  await this.componentService.getAll().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.components;
      },
  });
}

create() {
  this.router.navigateByUrl('/app/component-add');
}

edit(id: number) {
  this.router.navigateByUrl('/app/component-edit');

}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el componente?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.componentService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'componente ha sido eliminada.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el componente', 'error');
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
