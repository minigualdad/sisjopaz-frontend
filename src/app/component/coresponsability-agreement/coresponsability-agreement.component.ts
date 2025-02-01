import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { SurveyService } from '../../service/survey.service';
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

constructor(
  private beneficiaryService: BeneficiaryService,
  private surveyService: SurveyService,
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
  this.dataSource.paginator = this.paginator;
}

ngOnDestroy(): void { }

async getAll() {
  await this.beneficiaryService.getAllSignedAgreement().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.beneficiaries;
      },
  });
}

massiveAgr() {
  this.router.navigateByUrl(`/app/coresponsability-agreement-masive`);
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
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
