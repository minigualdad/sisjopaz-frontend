import { Component, Input, Output, EventEmitter,  SimpleChanges } from '@angular/core';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';

@Component({
  selector: 'app-assistance-table-fixed',
  standalone: false,
  templateUrl: './assistance-table-fixed.component.html',
  styleUrl: './assistance-table-fixed.component.scss'
})
export class AssistanceTableFixedComponent {
  @Input() records: any[] = [];
  // @Input() assistanceScannerId: number;
  @Output() minusClicked = new EventEmitter<{ record: any, date: string }>();
  @Output() plusClicked = new EventEmitter<{ record: any, date: string }>();
  @Output() reloadRecords = new EventEmitter<boolean>();
  @Output() addClicked = new EventEmitter<any>();


  dateSelector = false;
  selectedRecordData: any;

  columns: any = {
    identificationType: 'Tipo de documento',
    identification: 'Numero de Documento',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
    name: 'Nombre'
  };

  uniqueDates: string[] = [];

  constructor(){

  }

  ngOnInit(): void {
    this.getDates();
  }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['records']) {
        // if(this.records.assistanceScannerId === 0) {

        // }
        this.getDates();
      }
    }

  typeMap: { [key: string]: string } = {
    'cedula-de-ciudadania': 'CC',
    'tarjeta-de-identidad': 'TI',
    'permiso-por-proteccion-temporal': 'PPT'
  };

  onMinusClick(record: any, date: string) {
    this.minusClicked.emit({ record, date });
    this.reloadRecords.emit(true);
  }
  
  onPlusClick(record: any, date: string) {
    this.plusClicked.emit({ record, date });
    this.reloadRecords.emit(true);
  }
  
  
  getDates(){
    const allDates = this.records.flatMap(r => r.dates || []);  
    this.uniqueDates = [...new Set(allDates)].sort((a: string, b: string) => {
      const dateA = new Date(a.split(' ')[0]);
      const dateB = new Date(b.split(' ')[0]);
      return dateA.getTime() - dateB.getTime();
    });
  }

  handleAdd(record: any) {
    this.selectedRecordData = record;
    this.selectedRecordData.id = record.userId;
    this.addClicked.emit(this.selectedRecordData);
  }
}
