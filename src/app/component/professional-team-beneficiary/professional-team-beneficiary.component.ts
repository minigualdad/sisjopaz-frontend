import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { environment } from '../../../enviroment/enviroment';
import Swal from 'sweetalert2';
import { CharacterizationService } from '../../service/characterization.service';
import { MonitoringService } from '../../service/monitoring.service';
import { PaginatorService } from '../../service/paginator.service';

@Component({
  selector: 'app-professional-team-beneficiary',
  standalone: false,
  templateUrl: './professional-team-beneficiary.component.html',
  styleUrl: './professional-team-beneficiary.component.scss'
})
export class ProfessionalTeamBeneficiaryComponent implements OnInit, AfterViewInit {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    state: 'Estado',
    extemporaryRegister: 'Registro Extemporaneo',
    name: 'Nombre Completo',
    identificationType: 'Tipo de Identificación',
    identification: 'Número de Documento',
    email: 'Correo Electrónico',
    signDate: 'Fecha de Ingreso al Programa',
    group: 'Grupo Asignado',
    program: 'Programa',
    registraduryValidateCheck: 'Validación RNEC',
    registraduryValidateDate: 'Fecha de Validación RNEC',
    DNPCheck: 'Validación DNP',
    DNPCheckDate: 'Fecha de Validación DNP',
    ARNCheck: 'Validación ARN',
    ARNCheckDate: 'Fecha de Validación ARN',
    DPSCheck: 'Validación DPS',
    DPSCheckDate: 'Fecha de Validación DPS',

  };
  recordsTableColumns: string[] = [];
  serverUrl = environment.apiUrl;
  isData: boolean = false;

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  loading = false;
  totalSize = 0;
  searchValue: string = ''; 



  constructor(
    private surveyService: SurveyService,
    private _beneficiaryService: BeneficiaryService,
    private titleService: Title,
    public dialog: MatDialog,
    private _characterizationService: CharacterizationService,
    private _monitoringService: MonitoringService,
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
    this.loading = true;
    this.paginatorService.onPageChange(this.paginator, (pageIndex, pageSize) => {
      this.surveyService.getAllByProfessionalTeam(pageIndex, pageSize).subscribe({
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
    await this.surveyService.getAllByProfessionalTeam(0,10).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response)
        this.loading = false;
        if (this.dataSource.data.length > 0) {
          this.isData = true;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Error en la solicitud: ", err);
      }
    });
  }

  searchByFilter() {
    this.surveyService.filterByWord(this.searchValue,15).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
        this.loadData(response);
        },
    })
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

  downloadPDF(id: number) {
    this._beneficiaryService.getPDF(id).subscribe((response: any) => {
      const file = `${this.serverUrl}/${response.pdfFile}`;
      const url = file;
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = 'Acuerdo_Firmado.pdf'; // Nombre del archivo descargado
      a.click();
      window.URL.revokeObjectURL(url);
      Swal.fire('Se ha generado el PDF', 'Se ha generado el PDF exitosamente', 'success');
    },
      (error: any) => {
        Swal.fire('Error generando PDF', 'Ha ocurrido un eror durante la creación del PDF', 'error');
      }
    );
  }

  downloadPDFPreRegister(id: number) {
    this._beneficiaryService.getPDFPreRegister(id).subscribe(
      (response: any) => {
        if (response && response.pdfPath) {
          // Abrir directamente la URL proporcionada en una nueva pestaña
          window.open(response.pdfPath, '_blank');
          Swal.fire('PDF Generado', 'El PDF se ha generado exitosamente y se abrió en una nueva pestaña.', 'success');
        } else {
          Swal.fire('Error', 'No se recibió la ruta del PDF.', 'error');
        }
      },
      (error: any) => {
        console.error('Error al obtener el PDF:', error);
        Swal.fire('Error', 'Ha ocurrido un error al generar el PDF.', 'error');
      }
    );
  }

  downloadPDFCaracterization(characterizationId: number) {
    this._characterizationService.getCharacterizationPdf(characterizationId).subscribe({
      next: (response: any) => {

        window.open(`${environment.apiUrl}/${response.path}`, '_blank');
      },
      error: (err: any) => {
        console.error('Error al descargar el PDF:', err);
        alert('Hubo un error al descargar el PDF.');
      },
    });
  }

  downloadPDFMonitoring(monitoringId: number) {
    this._monitoringService.getMonitoringPdf(monitoringId).subscribe({
      next: (response: any) => {

        window.open(`${environment.apiUrl}/${response.path}`, '_blank');
      },
      error: (err: any) => {
        console.error('Error al descargar el PDF:', err);
        alert('Hubo un error al descargar el PDF.');
      },
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


  applyFilter(event: any) {
    this.searchValue = event.target.value.trim().toLowerCase();
  }
}
