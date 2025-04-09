import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { environment } from '../../../enviroment/enviroment';
import { PaginatorService } from '../../service/paginator.service';
import { AssistanceGeneratesService } from '../../service/assistance-generates.service';
import Swal from 'sweetalert2';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';


@Component({
  selector: 'app-assistance-generates-table',
  standalone: false,
  templateUrl: './assistance-generates-table.component.html',
  styleUrl: './assistance-generates-table.component.scss'
})
export class AssistanceGeneratesTableComponent implements OnInit, AfterViewInit {

    @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
      new MatSort();
    @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
    @ViewChild(MatSort) sort!: MatSort;
  
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    columns: any = {
      actions: 'Acciones',
      id: 'Id',
      group: 'Grupo',
      urlFile: 'URL',
      component: 'Componente',
      version: 'Version Planilla',
      urlOriginal: 'URL Imagen',
      urlProcessed: 'URL de Imagen Arreglada',
      state: 'Estado',
      date: 'Periodo',
      endDay: 'Fecha de Inicio',
      endDate: 'Fecha de Fin',
    };
    recordsTableColumns: string[] = [];
    serverUrl = environment.apiUrl;
  
    totalItems = 0;  
    pageSize = 10;   
    pageIndex = 0;   
  
    loading = false;
    totalSize = 0;
  
    searchValue: string = ''; 
    url = environment.apiUrl
  
  
    constructor(
      private surveyService: SurveyService,
      private titleService: Title,
      private paginatorService: PaginatorService,
      private router: Router,
      public dialog: MatDialog,
      private _assistanceGenerate : AssistanceGeneratesService,
      private _assistanceScannerBeneficiary : AssistanceScannerBeneficiaryService
    ) {
      this.recordsTableColumns = Object.keys(this.columns);
      this.titleService.setTitle('Asistencias Generadas');
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

        this._assistanceGenerate.getAll().subscribe({
          next: async (response: any) => {
            this.loadData(response);
          },
          error: (err) => {
            console.error("Error en la solicitud: ", err);
          }
        });
    }
  
    ngOnDestroy(): void { }
  
    async getAll() {
      await this._assistanceGenerate.getAll().subscribe({
        next: (response: any) => {
          this.dataSource.data = response;
          this.loadData(response);
  
        },
      });
    }
  
    // searchByFilter() {
    //   this.surveyService.filterByWord(this.searchValue).subscribe({
    //     next: (response: any) => {
    //       this.dataSource.data = response.assistanceGenerate;
    //       this.loadData(response);
    //       },
    //   })
    // }
  
    async loadData(response: any) {
      this.dataSource.data = response;
      await this.timer(100);
      this.dataSource.sort = this.recordsTableMatSort;
      this.loading = false;
    }
  
    timer(ms: number) {
      return new Promise(res => setTimeout(res, ms));
    }
  
    // filterButton() {
    //   const dialogRef = this.dialog.open(FilterComponent, {
    //     hasBackdrop: true,
    //     disableClose: true,
    //   });
    // }
  
    /**
    * Track by function for ngFor loops
    *
    * @param index
    * @param item
    */
    trackByFn(index: number, item: any): any {
      return item.id || index;
    }

    redirectTo(url: any){
      //Verificar que la ruta sea la correcta
      this.router.navigateByUrl(`${this.url}/${url}`);
    }
  
    applyFilter(event: any) {
      this.searchValue = event.target.value.trim().toLowerCase();
      // this.dataSource.filter = this.searchValue;
    }

    download() {
      this._assistanceGenerate.downloadData().subscribe({
          next: (response: Blob) => {
              const url = window.URL.createObjectURL(response);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Asistencias.xlsx';
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

    downloadById(id:number) {
      this._assistanceScannerBeneficiary.downloadAssistanceByScanner(id).subscribe({
          next: (response: Blob) => {
              const url = window.URL.createObjectURL(response);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Asistencias-${id}.xlsx`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
          },
          error: (error) => {
              console.error('Error descargando el archivo:', error);
              Swal.fire({
                              title: 'Operación incorrecta',
                              text: `No se ha podido Descargar el excel`,
                              icon: 'error',
                          });
          }
      });
    }

}
