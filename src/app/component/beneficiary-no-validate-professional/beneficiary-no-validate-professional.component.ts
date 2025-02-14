import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { ProfessionalTeamService } from '../../service/professional-team.service';
import { PaginatorService } from '../../service/paginator.service';

@Component({
  selector: 'app-beneficiary-no-validate-professional',
  standalone: false,
  templateUrl: './beneficiary-no-validate-professional.component.html',
  styleUrl: './beneficiary-no-validate-professional.component.scss'
})
export class BeneficiaryNoValidateProfessionalComponent implements OnInit, AfterViewInit{
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    // actions: 'Acciones',
    id: 'Id',
    identificationType: 'Tipo de Identificación',
    identification: 'Número de Documento',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
    bornDate: 'Fecha de Nacimiento',
    identificationExpedition: 'Fecha de Expedición del Documento',
  };
  recordsTableColumns: string[] = [];
  user: any;
  
  totalItems = 0;  
  pageSize = 10;   
  pageIndex = 0;   

  loading = false;
  totalSize = 0;
  searchValue: string = '';


  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    public dialog: MatDialog,
    private paginatorService: PaginatorService,
    private userService: UserService
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Jóvenes no Validados');

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
    // this.dataSource.paginator = this.paginator;

  this.loading = true;
  this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
      this.surveyService.getAllNoValidatesByProfessional(pageIndex, pageSize).subscribe({
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
  await this.surveyService.getAllNoValidatesByProfessional(0,10).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response)
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
    });
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
