import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { QuestionService } from '../../service/question.service';
import { QuestionAnswerService } from '../../service/question-answer.service';

@Component({
  selector: 'app-question-answer',
  standalone: false,
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.scss'
})
export class QuestionAnswerComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  answer: 'Respuesta',
  question: 'Pregunta',
};
recordsTableColumns: string[] = [];
user: any;
question: any;

constructor(
  private questionService: QuestionService,
  private questionAnswerService: QuestionAnswerService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService,
  private activatedRoute: ActivatedRoute
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Preguntas');
  this.question = {};
  this.question.id = this.activatedRoute.snapshot.paramMap.get('id');

}

/**
* On init
*/
ngOnInit(): void {
  this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
      this.getAll();
      this.showQuestion();
  });
}
showQuestion(){
  this.questionService.show(this.question.id)
  .subscribe((response: any)=>{
    this.question = response.question
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
  await this.questionAnswerService.getAllByQuestion(this.question.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.questionAnswers;
      },
  });
}

create() {
  this.router.navigateByUrl(`/app/question-answer-add/${this.question.id}`);
}

edit(id: number) {
  this.router.navigateByUrl(`/app/question-answer-edit/${id}`);

}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar la respuesta?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarla!',
      cancelButtonText: 'No, conservarla',
  });
  if (result.value) {
      this.questionAnswerService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'Respuesta ha sido eliminado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado la respuesta', 'error');
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
