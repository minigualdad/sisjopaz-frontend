import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-account-certification',
  standalone: false,
  templateUrl: './account-certification.component.html',
  styleUrl: './account-certification.component.scss'
})
export class AccountCertificationComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  name: 'Nombre',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación',
};
recordsTableColumns: string[] = [];
user: any;

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
  await this.surveyService.getAllByAccountCert().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.surveys;
      },
  });
}

download() {
  this.surveyService.downloadAccountCertificationLoaded().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'jovenes_con_certificado_de_cuenta.xlsx';
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

downloadSIIF() {
  this.surveyService.downloadSiifReport().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'siff.xlsx';
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

downloadPendingAccountData() {
  this.surveyService.downloadAccountCertificationLoaded().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'jovenes_pendientes_datos_cuenta.xlsx';
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

uploadMassiveAccountData() {
  this.router.navigateByUrl(`/app/account-data-masive`);
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

massiveAgr() {
  this.router.navigateByUrl(`/app/account-certification-masive`);
  }

}
