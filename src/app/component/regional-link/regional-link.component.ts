import { Component, ViewChild } from '@angular/core';
import { RegionalLinkService } from '../../service/regional-link.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-regional-link',
    templateUrl: './regional-link.component.html',
    styleUrl: './regional-link.component.scss',
    standalone: false
})
export class RegionalLinkComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  name: 'Nombre',
  user: 'Usuario',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
regional : any = {};
backRoute = "app/region";

constructor(
  private regionalLinkService: RegionalLinkService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService,
  private activatedRoute: ActivatedRoute
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Enlace Regional');
}

/**
* On init
*/
ngOnInit(): void {
  this.regional.id = this.activatedRoute.snapshot.paramMap.get('id');

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
  await this.regionalLinkService.getByRegionalId(this.regional.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.regionalLinks;
      },
  });
}

create() {
  this.router.navigateByUrl('/app/regional-link-add/'+this.regional.id);
}


async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el enlace regional?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.regionalLinkService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'Enlace regional ha sido eliminado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el proceso', 'error');
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
