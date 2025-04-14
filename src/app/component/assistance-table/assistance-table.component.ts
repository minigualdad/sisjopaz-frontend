import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-assistance-table',
  standalone: false,
  templateUrl: './assistance-table.component.html',
  styleUrl: './assistance-table.component.scss'
})
export class AssistanceTableComponent {
  @Input() records: any[] = [];
  @Output() minusClicked = new EventEmitter<{ record: any, date: string }>();
  @Output() plusClicked = new EventEmitter<{ record: any, date: string }>();

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

  onMinusClick(record: any, date: string) {
    this.minusClicked.emit({ record, date });
  }
  
  onPlusClick(record: any, date: string) {
    this.plusClicked.emit({ record, date });
  }
  
  
  getDates(){
    const allDates = this.records.flatMap(r => r.dates || []);  
    this.uniqueDates = [...new Set(allDates)].sort((a: string, b: string) => {
      const dateA = new Date(a.split(' ')[0]);
      const dateB = new Date(b.split(' ')[0]);
      return dateA.getTime() - dateB.getTime();
    });
  }
}
