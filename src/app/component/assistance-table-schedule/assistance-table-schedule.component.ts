import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-assistance-table-schedule',
  standalone: false,
  templateUrl: './assistance-table-schedule.component.html',
  styleUrl: './assistance-table-schedule.component.scss'
})
export class AssistanceTableScheduleComponent {
  @Input() records: any[] = [];
  @Output() removeClicked = new EventEmitter<{ record: any, date: string }>();
  @Output() addClicked = new EventEmitter<{ record: any, date: string }>();
  @Output() reloadRecords = new EventEmitter<boolean>();

  columns: any = {
    id: 'id',
    identificationType: 'Tipo de documento',
    identification: 'Numero de Documento',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
    name: 'Nombre',
    assistanceSignDate: 'Fecha Citación',
    recordType: 'Tipo de Registro',
    plainDate: 'Fecha',
  };

  uniqueDates: string[] = [];

  ngOnInit(): void {

    this.getDates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['records']) {
      this.getDates();
    }
  }

  typeMap: { [key: string]: string } = {
    'cedula-de-ciudadania': 'CC',
    'tarjeta-de-identidad': 'TI',
    'permiso-por-proteccion-temporal': 'PPT'
  };
  
  getDates() {
    const allDates = this.records.flatMap(record =>
      (record.dates || []).map((d: any) => d.date)
    );
  
    this.uniqueDates = [...new Set(allDates)].sort((a: string, b: string) => {
      const dateA = new Date(a.split(' ')[0]);
      const dateB = new Date(b.split(' ')[0]);
      return dateA.getTime() - dateB.getTime();
    });
  
  }
  
  getDateObject(record: any, date: string) {
    return record.dates.find((d: any) => d.date === date);
  }
  
  getClassForDate(record: any, date: string): string {
    const dateObj = this.getDateObject(record, date);
    if (dateObj?.hasAssistance) return 'bg-green-100 text-green-700';
    if (record.dates.some((d: any) => d.date === date)) return 'bg-red-100 text-red-700';
    return 'bg-yellow-100';
  }

  onRemoveClick(record: any, date: string) {
    this.removeClicked.emit({ record, date });
    this.reloadRecords.emit(false);
  }
  
  onAddClick(record: any, date: string) {
    this.addClicked.emit({ record, date });
    this.reloadRecords.emit(true);
  }
}
