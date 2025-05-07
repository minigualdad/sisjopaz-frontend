import { Component, Input, Output, EventEmitter,  SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assistance-beneficiaries',
  standalone: false,
  templateUrl: './assistance-beneficiaries.component.html',
  styleUrl: './assistance-beneficiaries.component.scss'
})
export class AssistanceBeneficiariesComponent {
  @Input() records: any[] = [];
  @Output() addClicked = new EventEmitter<{ record: any }>();
  @Output() reloadRecords = new EventEmitter<boolean>();

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  
  columns: any = {
    identificationType: 'Tipo de documento',
    identification: 'Numero de Documento',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
    name: 'Nombre'
  };

  constructor(){}

  ngOnInit(): void {
    this.dataSource.data = this.records;
  }

  typeMap: { [key: string]: string } = {
    'cedula-de-ciudadania': 'CC',
    'tarjeta-de-identidad': 'TI',
    'permiso-por-proteccion-temporal': 'PPT'
  };

  onAddClick(record: any) {
    this.addClicked.emit(record);
    this.reloadRecords.emit(true);
  }

}
