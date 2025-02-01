import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { GroupService } from '../../service/group.service';
import { GroupScheduleService } from '../../service/group-schedule.service';

@Component({
    selector: 'app-group-shcedule',
    templateUrl: './group-shcedule.component.html',
    styleUrl: './group-shcedule.component.scss',
    standalone: false
})
export class GroupShceduleComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  group: 'Grupo',
  coresponsability: 'Corresponsablidad',
  dateSplitted: 'Fecha',
  time: 'hora',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
group: any;


constructor(
  private groupScheduleService: GroupScheduleService,
  private groupService: GroupService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Horario de Grupos');
  this.group = {};
  this.group.id = this.activatedRoute.snapshot.paramMap.get('id');
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


async getGroup(){
  this.groupService.show(this.group.id)
  .subscribe((response: any) => {
    this.group = response.group;
  })
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
  await this.groupScheduleService.getAllByGroupId(this.group.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.groupSchedules;
          this.getGroup();
      },
  });
}

create() {
  this.router.navigateByUrl(`/app/group-schedule-add/${this.group.id}`);
}

scheduleBeneficiaries(id: number) {
  this.router.navigateByUrl(`/app/group-schedule-beneficiary/${id}`);

}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el horario del grupo?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.groupScheduleService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'horario de grupo profesional ha sido eliminado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el horario del grupo', 'error');
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
