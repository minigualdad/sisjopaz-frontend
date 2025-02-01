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
import { QuestionGroupService } from '../../service/question-group.service';
@Component({
  selector: 'app-question',
  standalone: false,
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    question: 'Pregunta',
    questionGroup: 'Categoría',
    subGroup: 'Subgrupo',
    isMandatory: 'Obligatoría',
    orderQuestion: 'Orden de la Pregunta',
  };
  recordsTableColumns: string[] = [];
  user: any;
  questionGroup: any;

  constructor(
    private questionService: QuestionService,
    private questionGroupService: QuestionGroupService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Preguntas');
    this.questionGroup = {};
    this.questionGroup.id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
      this.getAll();
      this.showQuestionGroup();
    });
  }
  showQuestionGroup() {
    this.questionGroupService.show(this.questionGroup.id)
      .subscribe((response: any) => {
        this.questionGroup = response.questionGroup
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
    await this.questionService.getAllByGroup(this.questionGroup.id).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.questions;
      },
    });
  }

  create() {
    this.router.navigateByUrl(`/app/question-add/${this.questionGroup.id}`);
  }

  edit(id: number) {
    this.router.navigateByUrl(`/app/question-edit/${id}`);

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
      this.questionService.delete(id).subscribe({
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
