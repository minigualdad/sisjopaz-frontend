import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { PaginatorService } from '../../service/paginator.service';


@Component({
  selector: 'app-dps',
  standalone: false,
  templateUrl: './dps.component.html',
  styleUrl: './dps.component.scss'
})
export class DpsComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
  @ViewChild(MatSort) sort!: MatSort;


  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    id: 'Id',
    state: 'Estado',
    DPSCheck: 'Revisión DPS',
    DPSCheckDate: 'Fecha de Revisión DPS',
    name: 'Nombre',
    identificationType: 'Tipo de Identificación',
    identification: 'Identificación'
  };
  recordsTableColumns: string[] = [];
  isData: boolean = false;

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
    this.titleService.setTitle('DPS');
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
    this.loading = true;
    this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
      this.surveyService.getAllByPendingDPSGeneral(pageIndex, pageSize).subscribe({
        next: async (response: any) => {
          this.loading = false;
          this.loadData(response);
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
    await this.surveyService.getAllByPendingDPSGeneral(0,10).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response)
        this.loading = false;
        if (this.dataSource.data.length > 0) {
          this.isData = true;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
    })
  }

  download() {
    this.surveyService.downloadDPS().subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jovenes_sin_validacion_dps.xlsx';
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


  massiveDPS() {
    this.router.navigateByUrl(`/app/survey-massive-dps`);
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
