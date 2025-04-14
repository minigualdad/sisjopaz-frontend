import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';

@Component({
  selector: 'app-asssitance-detected',
  standalone:false,
  templateUrl: './asssitance-detected.component.html',
  styleUrl: './asssitance-detected.component.scss'
})
export class AsssitanceDetectedComponent implements OnInit, AfterViewInit{

    @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
      new MatSort();
    @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador
    loading = false;

    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    columns: any = {
      actions: 'Acciones',
      recordType: 'Tipo de Registro',
      identificationType: 'Tipo de documento',
      identification: 'Numero de Documento',
      assistanceSignDate: 'Fechas de Asistencias',
      firstName: 'Primer Nombre',
      secondName: 'Segundo Nombre',
      firstLastName: 'Primer Apellido',
      secondLastName: 'Segundo Apellido',
    };
    recordsTableColumns: string[] = [];
    displayedColumns: string[] = [];
    user: any;
    assistanceSheetId: number;

    constructor(private assistanceScannerBenneficiaryService: AssistanceScannerBeneficiaryService,
      public dialog: MatDialog,
        private activatedRoute: ActivatedRoute
    ) {
      this.recordsTableColumns = Object.keys(this.columns);
      this.displayedColumns = ['select', ...this.recordsTableColumns, 'actions'];  
      this.assistanceSheetId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    }

    deletedAssistance(survey:any){

      Swal.fire({
                title: 'Vas a eliminar una Asistencia',
                text: `Eliminaras la asistencia de ${survey.firstName} ${survey.secondName} ${survey.firstLastName} ${survey.secondLastName}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.assistanceScannerBenneficiaryService.deletedAssistance(Number(survey.id)).subscribe({
                    next: (response: any) => {
                      this.getAll();
                    },
                    error: (error:any) => {
            
                    }
                  })
                }
              });

    }

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
  this.assistanceScannerBenneficiaryService.getAllByAssistanceSheetsId(this.assistanceSheetId).subscribe({
    next: (response:any) =>{
      this.dataSource.data = response;
    },
    error: (error: any) => {
    }
  })
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
