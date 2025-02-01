import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { DocumentValidateVerifyComponent } from '../document-validate-verify/document-validate-verify.component';
import { DocumentValidateUpdateComponent } from '../document-validate-update/document-validate-update.component';

@Component({
  selector: 'app-document-validate',
  standalone: false,
  templateUrl: './document-validate.component.html',
  styleUrl: './document-validate.component.scss'
})
export class DocumentValidateComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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


  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
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
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void { }

  async getAll() {
    await this.surveyService.getAllNoValidatesDocuments().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
      },
    });
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
