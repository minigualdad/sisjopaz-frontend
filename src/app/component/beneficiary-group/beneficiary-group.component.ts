import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { GroupService } from '../../service/group.service';
import { PaginatorService } from '../../service/paginator.service';

@Component({
  selector: 'app-beneficiary-group',
  standalone: false,
  templateUrl: './beneficiary-group.component.html',
  styleUrl: './beneficiary-group.component.scss'
})
export class BeneficiaryGroupComponent implements OnInit, AfterViewInit{
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
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

  totalItems = 0;  
  pageSize = 10;   
  pageIndex = 0;   

  loading = false;
  totalSize = 0;
  searchValue: string = '';


  constructor(
    private surveyService: SurveyService,
    private groupService: GroupService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private paginatorService: PaginatorService,
    
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
    // this.dataSource.paginator = this.paginator;

  this.loading = true;
  this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
      this.surveyService.getAllByGroup(this.group.id, pageIndex, pageSize).subscribe({
        next: async (response: any) => {
          this.loadData(response);
          this.loading = false;
      },
        error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
        }
      });
    });
  }

  ngOnDestroy(): void { }

  async getAll() {
  this.loading = true;
  await this.surveyService.getAllByGroup(this.group.id, 0,10).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
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

  searchByFilter() {
    this.surveyService.filterByWord(this.searchValue).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response);
      },
    })
  }

  async loadData(response: any) {
    this.dataSource.data = response.surveys;
    this.totalSize = response?.total;
    await this.timer(100);
    this.dataSource.sort = this.recordsTableMatSort;
    this.paginator.length = this.totalSize;
    this.loading = false;
  }
  
  timer(ms: number) {
    return new Promise(res => setTimeout(res, ms));
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
