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
  selector: 'app-arn',
  standalone: false,
  templateUrl: './arn.component.html',
  styleUrl: './arn.component.scss'
})
export class ArnComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
@ViewChild(MatSort) sort!: MatSort;


dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  id: 'Id',
  state: 'Estado',
  ARNCheck: 'Revisión ARN',
  ARNCheckDate: 'Fecha de Revisión ARN',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación',
  name: 'Nombre'
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
  private paginatorService: PaginatorService,
  public dialog: MatDialog,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Jóvenes');
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
    this.surveyService.getAllByPendingARNGeneral(pageIndex, pageSize).subscribe({
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
  await this.surveyService.getAllByPendingARNGeneral(0,10).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.surveys;
          this.loadData(response)
          this.loading = false;
          if(this.dataSource.data.length > 0) {
            this.isData = true;
          }
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
  });
}

massiveARN() {
  this.router.navigateByUrl(`/app/survey-massive-arn`);
}

searchByFilter() {
  this.surveyService.filterByWord(this.searchValue, 2).subscribe({
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

download() {
  this.surveyService.downloadARN().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'jovenes_sin_validacion_arn.xlsx';
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
    this.searchValue = event.target.value.trim().toLowerCase();
  }
}
