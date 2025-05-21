import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import Swal from 'sweetalert2';
import { environment } from '../../../enviroment/enviroment';
import { PaginatorService } from '../../service/paginator.service';

@Component({
  selector: 'app-rnec-validated',
  standalone: false,
  templateUrl: './rnec-validated.component.html',
  styleUrl: './rnec-validated.component.scss'
})
export class RnecValidatedComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    state: 'Estado',
    identificationType: 'Tipo de Identificación',
    identification: 'Número de Documento',
    firstNameOriginal: 'Primer Nombre Pre-Inscripción',
    secondNameOriginal: 'Segundo Nombre Pre-Inscripción',
    firstLastNameOriginal: 'Primer Apellido Pre-Inscripción',
    secondLastNameOriginal: 'Segundo Apellid Pre-Inscripción',
    bornDateOriginal: 'Fecha de Nacimiento Pre-Inscripción',
    firstName: 'Primer Nombre RNEC',
    secondName: 'Segundo Nombre RNEC',
    firstLastName: 'Primer Apellido RNEC',
    secondLastName: 'Segundo Apellido RNEC',
    bornDate : 'Fecha de Nacimiento RNEC',

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
    private paginatorService: PaginatorService,
    public dialog: MatDialog,
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Jóvenes Validados');
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
      this.surveyService.getAllExtemporary(pageIndex, pageSize).subscribe({
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

  async getAll() {
    await this.surveyService.getAllRNECValidated(0,10).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response);

      },
    });
  }

  searchByFilter() {
    this.surveyService.filterByWord(this.searchValue, 23).subscribe({
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

    downloadData() {
      this.loading = true;
      this.surveyService.downloadRNECValidated().subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'datos_validados.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          Swal.fire({
              icon: 'success',
              title: 'Descarga Completa',
              text: 'El archivo se ha descargado con éxito.',
              confirmButtonText: 'Aceptar'
          });
          this.loading = false;
      },
      error: (error) => {
          console.error('Error descargando el archivo:', error);
                Swal.fire({
              icon: 'error',
              title: 'Error en la descarga',
              text: 'Hubo un problema al descargar el archivo. Por favor, inténtelo de nuevo.',
              confirmButtonText: 'Aceptar'
          });
          this.loading = false;
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
