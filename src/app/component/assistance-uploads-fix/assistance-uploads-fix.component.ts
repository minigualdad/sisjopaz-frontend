import { Component, OnInit, ViewChild } from '@angular/core';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import { environment } from '../../../enviroment/enviroment';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { LogsIaErrorService } from '../../service/logs-ia-error.service';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';

@Component({
  selector: 'app-assistance-uploads-fix',
  standalone: false,
  templateUrl: './assistance-uploads-fix.component.html',
  styleUrl: './assistance-uploads-fix.component.scss'
})
export class AssistanceUploadsFixComponent {
   @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
   new MatSort();
 @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
 
 dataSource: MatTableDataSource<any> = new MatTableDataSource();
 columns: any = {
   actions: 'Acciones',
   id: 'ID',
   state: 'Estado',
   year: 'Año de Planilla',
   month: 'Mes de Planilla',
   group: 'Grupo',
   component: 'Componente',
   observation: 'Observacion',
   updateBy: 'Reportado Por',
   urlFileImageProcessed: 'Imagen Procesada',
 };
 recordsTableColumns: string[] = [];
 user: any;

 
 constructor(
   private titleService: Title,
   public dialog: MatDialog,
   private userService: UserService,
   private assistanceScannerService: AssistanceScannerService
 ) {
   this.recordsTableColumns = Object.keys(this.columns);
   this.titleService.setTitle('Assitencias Erroneas');
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
   await this.assistanceScannerService.getAllMistakeError().subscribe({
       next: (response: any) => {
           this.dataSource.data = response;
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
 
 applyFilter(filterValue: any) {
   this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
 }
}
