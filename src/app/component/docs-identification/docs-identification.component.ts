import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-docs-identification',
  standalone: false,
  templateUrl: './docs-identification.component.html',
  styleUrl: './docs-identification.component.scss'
})
export class DocsIdentificationComponent {

  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  nombre: 'Nombre',
};
docs: any = [
  { id: 1, nombre: "Registro Civil" },
  { id: 2, nombre: "Tarjeta de Identidad" },
  { id: 3, nombre: "Cédula de Ciudadanía" },
  { id: 4, nombre: "Cédula de Extranjería" },
  { id: 5, nombre: "Pasaporte" },
  { id: 6, nombre: "Menor sin ID" },
  { id: 7, nombre: "Adulto sin ID" },
  { id: 8, nombre: "Permiso Especial de Permanencia" },
  { id: 9, nombre: "Certificado de Nacido Vivo" },
  { id: 10, nombre: "Carné Diplomático" },
  { id: 11, nombre: "Salvoconducto" },
  { id: 12, nombre: "Documento Extranjero" },
  { id: 13, nombre: "Permiso por Protección Temporal" },
  { id: 14, nombre: "No Especificado" }
];


recordsTableColumns: string[] = [];
user: any;

constructor(
  private titleService: Title,
  public dialog: MatDialog,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Jóvenes');
}

/**
* On init
*/
ngOnInit(): void {
  this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
      this.getAll();
  });
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

          this.dataSource.data = this.docs;
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

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
