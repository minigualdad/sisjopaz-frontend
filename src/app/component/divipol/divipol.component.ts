import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DivipolService } from '../../service/divipol.service';

@Component({
    selector: 'app-divipol',
    templateUrl: './divipol.component.html',
    styleUrl: './divipol.component.scss',
    standalone: false
})
export class DivipolComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  name: 'Nombre',
  openingDate: 'Fecha de Apertura Inscripciones',
  closingDate: 'Fecha de Cierre Inscripciones',
  municipalityCode: 'Código Municipio',
  department: 'Departamento',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
toggleMenu: boolean = false;

constructor(
  private divipolService: DivipolService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Regiones');
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
  await this.divipolService.getAll().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.divipolas;
      },
  });
}

create() {
  this.router.navigateByUrl('/app/divipol-add');
}

edit(id: number) {
  this.router.navigateByUrl('/app/divipol-edit');

}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar la región?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.divipolService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'Región ha sido eliminado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado la región', 'error');
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

applyFilter(filterValue: any) {
  this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
}
}
