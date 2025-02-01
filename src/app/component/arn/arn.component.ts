import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-arn',
  standalone: false,
  templateUrl: './arn.component.html',
  styleUrl: './arn.component.scss'
})
export class ArnComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

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

constructor(
  private surveyService: SurveyService,
  private titleService: Title,
  private router: Router,
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
  this.dataSource.paginator = this.paginator;
}

ngOnDestroy(): void { }

async getAll() {
  await this.surveyService.getAllByPendingARNGeneral().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.surveys;
          if(this.dataSource.data.length > 0) {
            this.isData = true;
          }
      },
  });
}

massiveARN() {
  this.router.navigateByUrl(`/app/survey-massive-arn`);
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
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
