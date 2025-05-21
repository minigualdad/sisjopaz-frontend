import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import Swal from 'sweetalert2';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { environment } from '../../../enviroment/enviroment';
import { PaginatorService } from '../../service/paginator.service';
import { UpdateDocumentComponent } from '../update-document/update-document.component';

@Component({
  selector: 'app-banking-certification-rejected',
  standalone: false,
  templateUrl: './banking-certification-rejected.component.html',
  styleUrl: './banking-certification-rejected.component.scss'
})
export class BankingCertificationRejectedComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    stateAgreement: 'Estado',
    updatedDate: 'Fecha de Actualización',
    registerDate: 'Fecha de Registro',
    name: 'Nombre',
    identificationType: 'Tipo de Identificación',
    identification: 'Identificación',

  };
  recordsTableColumns: string[] = [];
  serverUrl = environment.apiUrl;

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  loading = false;
  totalSize = 0;
  searchValue: string = '';


  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    private _beneficiaryService: BeneficiaryService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private paginatorService: PaginatorService,

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
      this.surveyService.getAllByProfessionalTeamAndAccountCertRejectedOrPending(pageIndex, pageSize).subscribe({
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
    await this.surveyService.getAllByProfessionalTeamAndAccountCertRejectedOrPending(0, 10).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
    });
  }

    openUpdateDocumentModal(surveyId: number): void {
      const dialogRef = this.dialog.open(UpdateDocumentComponent, {
        hasBackdrop: true,
        disableClose: true,
        maxWidth: 'none',
        width: 'auto',
        height: 'auto',
        data: { id: surveyId }, // pasas el ID como data
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result.success === true) {
          this.getAll();
        }
      });
    }

  downloadPDF(id: number) {
    this._beneficiaryService.getPDF(id).subscribe((response: any) => {
      const file = `${this.serverUrl}/${response.pdfFile}`;
      const url = file;
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = 'MINIGUALDAD.pdf'; // Nombre del archivo descargado
      a.click();
      window.URL.revokeObjectURL(url);
      Swal.fire('Se ha generado el PDF', 'Se ha generado el PDF exitosamente', 'success');
    },
      (error: any) => {
        Swal.fire('Error generando PDF', 'Ha ocurrido un eror durante la creación del PDF', 'error');
      }
    );
  }

  searchByFilter() {
    this.surveyService.filterByWord(this.searchValue, 4).subscribe({
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

  applyFilter(filterValue: any) {
    this.searchValue = filterValue.target.value.trim().toLowerCase();
  }
}
