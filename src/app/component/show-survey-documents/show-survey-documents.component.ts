import { Component, OnInit } from '@angular/core';
import { DocumentSurveyService } from '../../service/document-survey.service';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { environment } from '../../../enviroment/enviroment';

@Component({
  selector: 'app-show-survey-documents',
  standalone:false,
  templateUrl: './show-survey-documents.component.html',
  styleUrl: './show-survey-documents.component.scss'
})
export class ShowSurveyDocumentsComponent implements OnInit{

  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    surveyId: 'Id Encuesta',
    documentType: 'Tipo de Documento',
    fileUrl: 'URL Archivo',
    createdAt: 'Fecha de Carga',
    state: 'Estado',
  };
  recordsTableColumns: string[] = [];
  user: any;
  toggleMenu: boolean = false;
  urlBack:string = environment.apiUrl;

  constructor(private _documentSurveyService:DocumentSurveyService,
      private titleService: Title,
      public dialog: MatDialog,      
    ) {
      this.recordsTableColumns = Object.keys(this.columns);
      this.titleService.setTitle('Regiones');
    }

  ngOnInit(): void {
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
      this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    }

    isArrayNotEmpty(variable: any): boolean {
      return Array.isArray(variable) && variable.length > 0;
    }
    
    showDocument(event:any){
      window.open(`${this.urlBack}/${event.fileUrl}`)
    }

  onSelectSurveyId(event: any){
    if(event.id){
      this._documentSurveyService.getAllDocumentBySurveyId(event.id).subscribe({
        next: (response: any) => {
          this.dataSource.data = response.surveyDocuments;
          if(this.dataSource.data.length <= 0){
            Swal.fire({
              title: 'Sin Documentos',
              text: 'Actualmente no hay documentos disponibles para este usuario.',
              icon: 'info',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#007BFF', // Color del botón
            });
          }
          
        }
      })
    }
  }
}
