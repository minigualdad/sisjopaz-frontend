import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
@Component({
  selector: 'app-dnp',
  standalone: false,
  templateUrl: './dnp.component.html',
  styleUrl: './dnp.component.scss'
})
export class DnpComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  id: 'Id',
  state: 'Estado',
  DNPCheck: 'Revisión DNP',
  DNPCheckDate: 'Fecha de Revisión DNP',
  name: 'Nombre',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación',
};
recordsTableColumns: string[] = [];
isData: boolean = false;
constructor(
  private titleService: Title,
  private surveyService: SurveyService,
  private router: Router,
  public dialog: MatDialog,
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('DNP');
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
  await this.surveyService.getAllByPendingDNPGeneral().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.surveys;
          if(this.dataSource.data.length > 0){
            this.isData = true
          }
      },
  });

}
download() {
  this.surveyService.downloadDNP().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'jovenes_sin_validacion_dnp.xlsx';
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

massiveDNP() {
  this.router.navigateByUrl(`/app/survey-massive-dnp`);
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
