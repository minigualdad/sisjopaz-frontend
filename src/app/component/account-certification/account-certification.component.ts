import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { PaginatorService } from '../../service/paginator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-certification',
  standalone: false,
  templateUrl: './account-certification.component.html',
  styleUrl: './account-certification.component.scss'
})
export class AccountCertificationComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    name: 'Nombre',
    identificationType: 'Tipo de Identificación',
    identification: 'Identificación',
  };
  recordsTableColumns: string[] = [];
  user: any;

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
    private paginatorService: PaginatorService,
    public dialog: MatDialog,
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
    await this.surveyService.getAllByAccountCert(0, 10).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response);
        this.loading = false;

      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
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

  download() {
    this.surveyService.downloadAccountCertificationLoaded().subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jovenes_con_certificado_de_cuenta.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        Swal.fire({
          icon: 'success',
          title: 'Descarga exitosa',
          text: 'El archivo se ha descargado correctamente.',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error descargando el archivo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en la descarga',
          text: 'Verifique que haya información cargada.',
          confirmButtonText: 'Ok'
        });
      }
    });
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

  downloadSIIF() {
    this.surveyService.downloadSiifReport().subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'siff.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        Swal.fire({
          icon: 'success',
          title: 'Descarga exitosa',
          text: 'El archivo se ha descargado correctamente.',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error descargando el archivo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en la descarga',
          text: 'Verifique que haya información cargada.',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  downloadPendingAccountData() {
    this.surveyService.downloadAccountCertificationLoaded().subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jovenes_pendientes_datos_cuenta.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        Swal.fire({
          icon: 'success',
          title: 'Descarga exitosa',
          text: 'El archivo se ha descargado correctamente.',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error descargando el archivo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en la descarga',
          text: 'Verifique que haya información cargada.',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  uploadMassiveAccountData() {
    this.router.navigateByUrl(`/app/account-data-masive`);
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

  massiveAgr() {
    this.router.navigateByUrl(`/app/account-certification-masive`);
  }

}
