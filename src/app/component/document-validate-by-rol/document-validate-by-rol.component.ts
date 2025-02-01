import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../enviroment/enviroment';
import { SurveyService } from '../../service/survey.service';
import { DocumentValidateUpdateComponent } from '../document-validate-update/document-validate-update.component';
import { DocumentValidateVerifyComponent } from '../document-validate-verify/document-validate-verify.component';
import { BankCertificationValidateUpdateComponent } from '../bank-certification-validate-update/bank-certification-validate-update.component';
import { BankCertificationValidateVerifyComponent } from '../bank-certification-validate-verify/bank-certification-validate-verify.component';

@Component({
  selector: 'app-document-validate-by-rol',
  standalone: false,
  templateUrl: './document-validate-by-rol.component.html',
  styleUrl: './document-validate-by-rol.component.scss'
})
export class DocumentValidateByRolComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  name: 'Nombre',
  identification: 'Número de Identificación',
  identificationType: 'Tipo de Identificación',
};
recordsTableColumns: string[] = [];
user: any;
server: any = environment.apiUrl + '/app/survey/files/';
survey: any = {};

constructor(
  private surveyService: SurveyService,
  private titleService: Title,
  public dialog: MatDialog,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Histórico Planillas');
}

/**
* On init
*/
ngOnInit(): void {
  this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
  });
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
  await this.surveyService.getAllNoValidatesDocumentsBySurvey(this.survey.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.surveys;
      },
  });
}

  showAccountCertification(id: any) {
    const dialogRef = this.dialog.open(BankCertificationValidateVerifyComponent, {
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

  updateAccountCertification(id: any) {
    const dialogRef = this.dialog.open(BankCertificationValidateUpdateComponent, {
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

checkImage(id: any){
  let newId = id-1;
  const url = this.server + this.dataSource.data[newId].urlFileImageProcessed;
  if (url) {
    window.open(url, '_blank'); // Abre el documento en una nueva pestaña
  } else {
    console.error('No se encontró una URL válida para el documento.');
  }
}

checkOriginalImage(id: any){
  let newId = id-1;
  const url = this.server + this.dataSource.data[newId].urlFileImageOriginal;
  if (url) {
    window.open(url, '_blank'); // Abre el documento en una nueva pestaña
  } else {
    console.error('No se encontró una URL válida para el documento.');
  }
}

async onSelectSurvey(event: any){
  this.survey.id = event.id;
  await this.getAll();
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
}
