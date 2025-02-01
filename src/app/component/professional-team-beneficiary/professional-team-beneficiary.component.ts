import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-professional-team-beneficiary',
  standalone: false,
  templateUrl: './professional-team-beneficiary.component.html',
  styleUrl: './professional-team-beneficiary.component.scss'
})
export class ProfessionalTeamBeneficiaryComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

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


  constructor(
    private surveyService: SurveyService,
    private _beneficiaryService: BeneficiaryService,
    private titleService: Title,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
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
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void { }

  async getAll() {
    await this.surveyService.getAllByProfessionalTeam().subscribe({
        next: (response: any) => {
            this.dataSource.data = response.surveys;
        },
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

  downloadPDF(id:number) {
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
    (error:any) =>{
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
  

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
