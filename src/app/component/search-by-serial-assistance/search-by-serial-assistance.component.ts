import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssistanceSheetsService } from '../../service/assistance-sheets.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-by-serial-assistance',
  standalone: false,
  templateUrl: './search-by-serial-assistance.component.html',
  styleUrl: './search-by-serial-assistance.component.scss'
})
export class SearchBySerialAssistanceComponent implements OnInit, AfterViewInit{
  
     @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
     new MatSort();
   @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
   
   dataSource: MatTableDataSource<any> = new MatTableDataSource();
   columns: any = {
     id: 'ID',
     assistanceSignDate: 'Fecha Asistencia',
     name: 'Nombre',
     identificationType: 'Tipo de Identificación',
     identification: 'Identificación',
    //  component: 'Componente',
     urlFileImageProcessed: 'Imagen Procesada',
     
    };

  showObservation = false;
  recordsTableColumns: string[] = [];
  user: any;

  form: FormGroup;
  assistance: any;
  showImg = false;
  showTable = false;
  data : any[] = [];
  assistanceScannerId: number = 1;

  constructor(
    private router: Router,
    private _assistanceSheets: AssistanceSheetsService,
    private fb: FormBuilder
  ) {
   this.recordsTableColumns = Object.keys(this.columns);
   this.form = this.fb.group({
      serial: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.recordsTableMatSort;
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnDestroy(): void { }

  showImage(){
    this.showImg = !this.showImg;
  }

  get serial(){
    return this.form.get('serial')?.value;
  }

  getRepeatedUrlsWithScannerId(objectsArray: any[]) {
    const urlTracker: Record<string, { count: number, scannerId?: number }> = {};
    const result: Array<{ urlFileImageProcessed: string, assistanceScannerId?: number }> = [];
  
    objectsArray.forEach(obj => {
      if (obj.urlFileImageProcessed) {
        const url = obj.urlFileImageProcessed;
        
        if (!urlTracker[url]) {
          urlTracker[url] = {
            count: 0,
            scannerId: obj.assistanceScannerId
          };
        }
        
        urlTracker[url].count++;
      }
    });
  
    for (const [url, data] of Object.entries(urlTracker)) {
      if (data.count > 1) {
        result.push({
          urlFileImageProcessed: url,
          assistanceScannerId: data.scannerId
        });
      }
    }
  
    return result;
  }

  showOrHiddenTable() {
    this.showTable = !this.showTable;
  }

  getAll(){
    const serial = this.form.value.serial;
    this._assistanceSheets.findBySerial(serial).subscribe({
      next: (response : any) => {
        this.assistance = response.assistanceSheet;
        this.dataSource.data = this.transformDatesToSend(response);
        this.data = this.getRepeatedUrlsWithScannerId(response.assistanceBeneficiaries);
        if(response.assistanceBeneficiaries.length == 0){
          Swal.fire({
            icon: 'info',
            title: 'Sin asistencias',
            text: 'No se encontraron asistencias.',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (error : any) => {
        Swal.fire({
          icon: 'warning',
          title: 'Hubo un error',
          text: 'Parece que hubo problemas buscando el Serial. Verifica la informacion e intentalo de nuevo',
          confirmButtonText: 'Aceptar'
        });
      }
    })
  }

  transformDatesToSend(data: any) {
    this.assistanceScannerId = Number(data.assistanceBeneficiaries[0].assistanceScannerId);
    const groupedData: any = {};
    data.assistanceBeneficiaries.forEach((item: any) => {
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
  
    return Object.values(groupedData);
  }

  closeModal(event:any){
    this.showObservation = event;
  }

  onSubmit() {
    this.getAll();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }
}