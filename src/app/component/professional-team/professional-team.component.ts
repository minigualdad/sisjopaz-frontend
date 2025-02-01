import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ProfessionalTeamService } from '../../service/professional-team.service';
import { RegionalService } from '../../service/regional.service';
@Component({
    selector: 'app-professional-team',
    templateUrl: './professional-team.component.html',
    styleUrl: './professional-team.component.scss',
    standalone: false
})
export class ProfessionalTeamComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  name: 'Descripción',
  user: 'Nombre',
  region: 'Región',
  coordinator: 'Coordinador',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
region: any;

constructor(
  private professionalTeamService: ProfessionalTeamService,
  private regionService: RegionalService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService,
  private activatedRoute: ActivatedRoute
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Equipo Profesional');
  this.region = {};
  this.region.id = this.activatedRoute.snapshot.paramMap.get('id');
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

showRegion(){
  this.regionService.show(this.region.id)
  .subscribe((response: any) => {
    this.region = response.region;
  })
}

async getAll() {
  await this.professionalTeamService.getByRegionalId(this.region.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.professionalTeams;
          this.showRegion();
      },
  });
}

create() {
  this.router.navigateByUrl(`/app/professional-team-add/${this.region.id}`);
}

edit(id: number) {
  this.router.navigateByUrl(`/app/professional-team-edit/${id}`);

}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el equipo profesional?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.professionalTeamService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'Equipo profesional ha sido eliminado.',
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
