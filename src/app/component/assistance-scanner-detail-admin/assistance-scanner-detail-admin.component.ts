import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import { PaginatorService } from '../../service/paginator.service';
import Swal from 'sweetalert2';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import { GroupComponent } from '../group/group.component';
import { environment } from '../../../enviroment/enviroment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assistance-scanner-detail-admin',
  standalone: false,
  templateUrl: './assistance-scanner-detail-admin.component.html',
  styleUrl: './assistance-scanner-detail-admin.component.scss'
})
export class AssistanceScannerDetailAdminComponent {
 
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatSort) sort!: MatSort;

  showAddPeriod = false;
  showImg = false;
  assistance:any;
  showFormError =false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    id: 'Id',
    assistanceSignDate: 'Fecha Citación',
    recordType: 'Tipo de Registro',
    identification: 'Identificación del Beneficiario',
    identificationType: 'Tipo de Identificación del Beneficiario',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
  };
  
  selectedIds: number[] = [];
  recordsTableColumns: string[] = [];
  displayedColumns: string[] = [];
  assistanceScanner: any;
  periods: any;
  isFormVisible = true;
  surveyId: any = {};
  assistanceScannerId:number;
  user: any = {};
  isData: boolean = false;
  groupComponentId = localStorage.getItem('componentId');
  backRoute = `app/assistance-scanner-all`;
  
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  
  loading = false;
  totalSize = 0;
  groupComponentDateActivityBeneficiary: any;
  GroupComponentId: any;

  apiUrl = environment.apiUrl;
  urlData: any;

  assistanceDateStart: any;
  assistanceDateEnd: any;
  assistanceBeneficiariesList: any;
  dateSelector = false;
  form: FormGroup;

  selectedRecordData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private assistanceScannerService: AssistanceScannerService,
    private _assistanceScannerBeneficiaryService : AssistanceScannerBeneficiaryService,
    private groupComponentDateActivityBenefiaryService: GroupComponentDateActivityBenefiaryService,
  ) {
    this.recordsTableColumns = Object.keys(this.columns).filter(col => col !== 'actions' && col !== 'select');
    this.displayedColumns = ['select', ...this.recordsTableColumns]; // Acciones primero, luego checkbox y demás columnas
    this.titleService.setTitle('Actividades');
    this.assistanceScannerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.form = new FormGroup({
          userId: new FormControl('', Validators.required),
          dateActivity: new FormControl('', Validators.required),
          groupComponentId: new FormControl('', Validators.required),
          hasAssitence: new FormControl(false),
          assistanceScannerId: new FormControl(''),
        });
        
  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.assistanceScannerId = Number(id);
      this.getAll(); // recarga tus datos
    });
    this.groupComponentDateActivityBeneficiary = {
      userId: this.surveyId,
      pageIndex: 0,
      pageSize: 10, 
    }
    this.form.controls['assistanceScannerId'].setValue(this.assistanceScannerId);
  }

  closeModal(event:any){
    this.showFormError = event;
  }

  showImage(){
    this.showImg = !this.showImg;
  }

  getAll() {
    this._assistanceScannerBeneficiaryService.findByAssistanceScannerId(this.assistanceScannerId).subscribe({
      next: (response: any) => {
        this.groupComponentId = response.assistanceScanner.AssistanceSheet.AssistanceGenerate.groupComponentId; 
        this.dataSource.data = response.assistanceBeneficiaries;
        this.assistanceBeneficiariesList = response.assistanceBeneficiariesList;
        this.assistanceDateStart = response.assistanceDateStart;
        this.assistanceDateEnd = response.assistanceDateEnd;
        this.urlData = response.assistanceScanner;
        this.loadData(response.assistanceBeneficiaries);
        this.loading = false;
        if (this.dataSource.data.length > 0) {
          this.isData = true;
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Sin información',
            text: 'No hay información cargada para esta planilla.',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (err: any) => {
        console.error('Error al obtener los ciclos de grupo:', err);
      }
    });
  }

  /**
  * After view init
  */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
  }

  backPage(){
    let id = this.assistanceScannerId - 1
    if(id === 0){
      id = 1
    }
    this.router.navigateByUrl(`/app/assistance-scanner-detail-admin/${id}`);
  }

  nextPage(){
    let id = this.assistanceScannerId + 1
    if(id === 0){
      id = 1
    }
    this.router.navigateByUrl(`/app/assistance-scanner-detail-admin/${id}`);
  }

  transformDatesToSend(data: any) {
    const groupedData: any = {};
  
    data.forEach((item: any) => {
      const id = item.identification;
  
      if (!groupedData[id]) {
        groupedData[id] = {
          ...item,
          dates: [],
        };
      }
  
      const dateParts = item.assistanceSignDate.split('-');
      const year = Number(dateParts[0]);
      const month = Number(dateParts[1]) - 1;
      const day = Number(dateParts[2]);
  
      const dateObj = new Date(year, month, day);
      const dayOfWeek = dateObj.toLocaleDateString('es-ES', { weekday: 'long' });
      const formattedDate = `${item.assistanceSignDate} (${dayOfWeek})`;
  
      groupedData[id].dates.push(formattedDate);
    });
  
    const groupedArray = Object.values(groupedData);
  
    groupedArray.sort((a: any, b: any) => {
      const aFirst = a.firstLastName?.toLowerCase() || '';
      const bFirst = b.firstLastName?.toLowerCase() || '';
  
      if (aFirst < bFirst) return -1;
      if (aFirst > bFirst) return 1;
  
      const aSecond = a.secondLastName?.toLowerCase() || '';
      const bSecond = b.secondLastName?.toLowerCase() || '';
  
      if (aSecond < bSecond) return -1;
      if (aSecond > bSecond) return 1;
  
      return 0;
    });
  
    return groupedArray;
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

  async loadData(response: any) {
    this.dataSource.data = this.transformDatesToSend(response);
    this.totalSize = response?.total;
    await this.timer(100);
    this.dataSource.sort = this.recordsTableMatSort;
    this.loading = false;
  }

  timer(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }

  fixAttendance(){
    this.ngOnInit();
  }

  handleMinus(event: { record: any, date: string }) {
    const cleanDate = event.date.split(' ')[0];
    this.form.patchValue({
      userId: event.record.userId,
      dateActivity: cleanDate,
      hasAssitence: false,
    });
    this.create();
  }

  handlePlus(event: { record: any, date: string }) {
    const cleanDate = event.date.split(' ')[0];
    this.form.patchValue({
      userId: event.record.userId,
      dateActivity: cleanDate,
      hasAssitence: true,
    });
    this.create();
  }

  handleAdd(record: any) {
    this.selectedRecordData = record;
    this.dateSelector = true;
  }

  handleCreate(date: any) {
    this.form.patchValue({
      dateActivity: date,
      userId: this.selectedRecordData?.id,
      hasAssitence: true,
    });
    this.create();
    this.handleClose();
  }

  handleClose() {
    this.dateSelector = false;
  }

  create() {
      this.form.controls['assistanceScannerId'].setValue(this.assistanceScannerId);
      this.form.controls['groupComponentId'].setValue(this.groupComponentId);
      if (this.form.invalid) return;
      this.groupComponentDateActivityBenefiaryService.createAssistance(this.form.value).subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Asistencia corregida', 'success').then(() => {
            this.ngOnInit();
            this.fixAttendance();
          });
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido corregir la asistencia', 'error').then(() => {
            this.ngOnInit();
          });
        }
      });
  } 
}
