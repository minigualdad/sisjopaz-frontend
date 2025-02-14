import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { PaginatorService } from '../../service/paginator.service';

@Component({
  selector: 'app-beneficiary-no-validate',
  standalone: false,
  templateUrl: './beneficiary-no-validate.component.html',
  styleUrl: './beneficiary-no-validate.component.scss'
})
export class BeneficiaryNoValidateComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
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

  totalItems = 0;  
  pageSize = 10;   
  pageIndex = 0;   

  loading = false;
  totalSize = 0;
  searchValue: string = '';


  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private paginatorService: PaginatorService,
    
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Jóvenes no Validados');
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
    // this.dataSource.paginator = this.paginator;

  this.loading = true;
  this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
      this.surveyService.getAllNoValidates(pageIndex, pageSize).subscribe({
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

  async getAll() {
  this.loading = true;
  await this.surveyService.getAllNoValidates(0,10).subscribe({
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

  massiveValidate() {
    this.router.navigateByUrl(`/app/beneficiary-massive-validate`);
  }

  download() {
    this.surveyService.downloadValidateExcel().subscribe({
        next: (response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'jovenes_sin_aprobacion.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        error: (error) => {
            console.error('Error descargando el archivo:', error);
            alert('Error descargando el archivo.');
        }
    });
}

  dps() {
    this.router.navigateByUrl(`/app/survey-massive-dps`);
  }

  arn() {
    this.router.navigateByUrl(`/app/survey-massive-arn`);
  }

  edit(id: number) {
    this.router.navigateByUrl(`/app/beneficiary-edit/${id}`);

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
