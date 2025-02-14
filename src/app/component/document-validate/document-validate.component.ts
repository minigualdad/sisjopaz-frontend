import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { DocumentValidateVerifyComponent } from '../document-validate-verify/document-validate-verify.component';
import { DocumentValidateUpdateComponent } from '../document-validate-update/document-validate-update.component';
import { PaginatorService } from '../../service/paginator.service';


@Component({
  selector: 'app-document-validate',
  standalone: false,
  templateUrl: './document-validate.component.html',
  styleUrl: './document-validate.component.scss'
})
export class DocumentValidateComponent implements OnInit, AfterViewInit  {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    documentIdentificationCheck: 'Estado de Validación',
    documentIdentificationDate: 'Fecha de Validacion del Documento',
    documentIdentificationMotive: 'Motivo de Subsanación anterior', 
    identificationType: 'Tipo de Identificación',
    identification: 'Número de Documento',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',

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
    this.titleService.setTitle('Documentos no Validados');

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
      this.surveyService.getAllByAccountCert(pageIndex, pageSize).subscribe({
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
    this.loading = true;
    await this.surveyService.getAllByAccountCert(0,10).subscribe({
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
  })
}

  massiveValidate() {
    this.router.navigateByUrl(`/app/beneficiary-massive-validate`);
  }

  showDocument(id: any) {
    const dialogRef = this.dialog.open(DocumentValidateVerifyComponent, {
      hasBackdrop: true,
      disableClose: true,
      maxWidth: 'none',
      width: 'auto',
      height: 'auto',
      data: { id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  updateDocument(id: any) {
    const dialogRef = this.dialog.open(DocumentValidateUpdateComponent, {
      hasBackdrop: true,
      disableClose: true,
      maxWidth: 'none',
      width: 'auto',
      height: 'auto',
      data: { id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
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
