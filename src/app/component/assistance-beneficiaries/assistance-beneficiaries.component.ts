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

  currentPage: number = 1;
  pageSize: number = 11;

  constructor(){}

  ngOnInit(): void {
    this.dataSource.data = this.records;
  }

  get totalPages(): number {
    return Math.ceil(this.records.length / this.pageSize);
  }
  
  get paginatedRecords(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['records']) {
      const prev = changes['records'].previousValue;
      const current = changes['records'].currentValue;
  
      const sameLength = prev?.length === current.length;
      const sameData = JSON.stringify(prev) === JSON.stringify(current);

      if (!sameLength || !sameData) {
        this.currentPage = 1;
      }
    }
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
