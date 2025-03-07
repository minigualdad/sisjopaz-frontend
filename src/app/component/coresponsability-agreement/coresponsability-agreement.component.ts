import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { SurveyService } from '../../service/survey.service';
import { PaginatorService } from '../../service/paginator.service';
@Component({
  selector: 'app-coresponsability-agreement',
  standalone: false,
  templateUrl: './coresponsability-agreement.component.html',
  styleUrl: './coresponsability-agreement.component.scss'
})
export class CoresponsabilityAgreementComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  id: 'Id',
  state: 'Estado',
  signDate: 'Fecha Firma del Acuerdo',
  name: 'Nombre',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación',
};
recordsTableColumns: string[] = [];
totalItems = 0;  
pageSize = 10;   
pageIndex = 0;   

loading = false;
totalSize = 0;

searchValue: string = ''; 

constructor(
  private beneficiaryService: BeneficiaryService,
  private surveyService: SurveyService,
  private paginatorService: PaginatorService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Beneficiarios');
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

  this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
    this.beneficiaryService.getAllSignedAgreement(pageIndex, pageSize).subscribe({
      next: async (response: any) => {
        this.loadData(response);
      },
      error: (err) => {
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

async getAll() {
  await this.beneficiaryService.getAllSignedAgreement(0,10).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.beneficiaries;
          this.loadData(response)
      },
  });
}

massiveAgr() {
  this.router.navigateByUrl(`/app/coresponsability-agreement-masive`);
}

async loadData(response: any) {
  this.dataSource.data = response.beneficiaries;
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
  this.surveyService.downloadCoresponsabilityAgreement().subscribe({
      next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'jovenes_con_acuerdo_de_corresponsabilida.xlsx';
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
    // this.dataSource.filter = this.searchValue;
  }
}
