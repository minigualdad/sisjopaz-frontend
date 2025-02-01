import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-beneficiary-group',
  standalone: false,
  templateUrl: './beneficiary-group.component.html',
  styleUrl: './beneficiary-group.component.scss'
})
export class BeneficiaryGroupComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    id: 'Id',
    name: 'Nombre Completo',
    identification: 'Número de Documento',
    email: 'Correo Electrónico',
    startProgramDate: 'Fecha de ingreso al Programa',
    group: 'Grupo Asignado',
    state: 'Estado',
  };
  recordsTableColumns: string[] = [];
  user: any;
  group: any;

  constructor(
    private surveyService: SurveyService,
    private groupService: GroupService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Jóvenes');
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

  async getAll() {
    await this.surveyService.getAllByGroup(this.group.id).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
      },
    });
  }

  showGroup(){
    this.groupService.show(this.group.id)
    .subscribe((response: any) => {
      this.group = response.group
    })
  }

  create() {
    this.router.navigateByUrl(`/app/beneficiary-add-group/${this.group.id}`);
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

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
