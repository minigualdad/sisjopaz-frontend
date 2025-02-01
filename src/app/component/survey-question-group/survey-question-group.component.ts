import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SurveyQuestionGroupService } from '../../service/survey-question-group.service';
@Component({
  selector: 'app-survey-question-group',
  standalone: false,
  templateUrl: './survey-question-group.component.html',
  styleUrl: './survey-question-group.component.scss'
})
export class SurveyQuestionGroupComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  questionGroup: 'Categoría de Preguntas',
  surveyDate: 'Fecha Encuesta',
  name: 'Joven',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación'
};
recordsTableColumns: string[] = [];
user: any;

constructor(
  private surveyQuestionGroupService: SurveyQuestionGroupService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Encuestas');

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
  await this.surveyQuestionGroupService.getAll().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.surveyQuestionGroups;
      },
  });
}

create() {
  this.router.navigateByUrl(`/app/survey-question-group-add`);
}

edit(id: number) {
  this.router.navigateByUrl(`/app/survey-question-group-edit/${id}`);

}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar la encuesta?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarla!',
      cancelButtonText: 'No, conservarla',
  });
  if (result.value) {
      this.surveyQuestionGroupService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'Encuesta ha sido eliminada.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado la encuesta', 'error');
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
