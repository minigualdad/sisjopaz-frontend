import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { GroupProfessionalTeamService } from '../../service/group-professional-team.service';
import { GroupComponentService } from '../../service/group-component.service';

@Component({
    selector: 'app-group-professional-team',
    templateUrl: './group-professional-team.component.html',
    styleUrl: './group-professional-team.component.scss',
    standalone: false
})
export class GroupProfessionalTeamComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  professionalTeam: 'Descripción del Profesional',
  professionalTeamUser: 'Usuario del Profesional',

};
recordsTableColumns: string[] = [];
user: any;
group: any;
groupName = "";
groupComponent: any = { id: 0 };
component: any;
groupComponentId = localStorage.getItem('componentId')
backRoute = `app/component-group/${this.groupComponentId}`

constructor(
  private groupProfessionalTeamService: GroupProfessionalTeamService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Grupo De Equipos Profesionales');
  this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');

}

/**
* On init
*/
ngOnInit(): void {
  this.getAll();
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
  await this.groupProfessionalTeamService.getAllByComponentGroupId(this.groupComponent.id)
  .subscribe({
      next: (response: any) => {
          this.dataSource.data = response.groupComponentProfessionals;
          this.group = response.group;
          this.component = response.component;
      },
  });
}

create() {
  this.router.navigateByUrl(`/app/group-professional-team-add/${this.groupComponent.id}`);
}


async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas desvincular del grupo a este profesional?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desvincularlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.groupProfessionalTeamService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  'Desvinculado!',
                  'El profesional ha sido desvinculado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha desvinculado el profesional', 'error');
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
