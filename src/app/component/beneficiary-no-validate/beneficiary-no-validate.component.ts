import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-beneficiary-no-validate',
  standalone: false,
  templateUrl: './beneficiary-no-validate.component.html',
  styleUrl: './beneficiary-no-validate.component.scss'
})
export class BeneficiaryNoValidateComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
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
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void { }

  async getAll() {
    await this.surveyService.getAllNoValidates().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
      },
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
