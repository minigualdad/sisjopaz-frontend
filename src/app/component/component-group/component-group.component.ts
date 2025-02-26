import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { GroupComponentService } from '../../service/group-component.service';
import { GroupService } from '../../service/group.service';
import { ComponentGroupTemplateComponent } from '../component-group-template/component-group-template.component';

@Component({
  selector: 'app-component-group',
  standalone: false,
  templateUrl: './component-group.component.html',
  styleUrl: './component-group.component.scss'
})
export class ComponentGroupComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  component: 'Componente',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
group: any
loading: boolean = false;

constructor(
  private groupComponentService: GroupComponentService,
  private groupService: GroupService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService,
  private activatedRoute: ActivatedRoute,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Componentes');
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
      this.showGroup();
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

showGroup(){
  this.groupService.show(this.group.id)
  .subscribe((response: any) => {
    this.group = response.group;
  })
}
async getAll() {
  await this.groupComponentService.getAllByGroup(this.group.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.groupComponents;
      },
  });
}

create() {
  this.router.navigateByUrl(`/app/component-group-add/${this.group.id}`);
}


async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el horario?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.groupComponentService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'Horario ha sido eliminado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el horario', 'error');
  }
}

downloadAssistanceTemplate(id: any) {
  const dialogRef = this.dialog.open(ComponentGroupTemplateComponent, {
      hasBackdrop: true,
      disableClose: true,
      maxWidth: 'none',
      width: 'auto',
      height: 'auto',
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getAll();
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

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
