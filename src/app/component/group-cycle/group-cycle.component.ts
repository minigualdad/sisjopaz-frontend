import { Component, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupCycleService } from '../../service/group-cycle.service';
@Component({
  selector: 'app-group-cycle',
  standalone:false,
  templateUrl: './group-cycle.component.html',
  styleUrl: './group-cycle.component.scss'
})
export class GroupCycleComponent {
    @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  showAddPeriod = false;
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    cycle: 'Ciclo',
    periodo: 'Periodo',
    groupId: 'Id de Grupo',
    state: 'Estado',

  };
  recordsTableColumns: string[] = [];
  periods: any;
  isFormVisible = true;
  
  constructor(
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,private _groupCycleService: GroupCycleService
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Ciclos');
  }
  
  /**
  * On init
  */
  ngOnInit(): void {
    this._groupCycleService.getAllGroupCycles().subscribe({
      next: (response: any) => {
        const data = response.groupCycle.map((groupCycle: any) => ({
          ...groupCycle,
          periodo: `${groupCycle. Period!.year}-${groupCycle.Period!.month} `, 
        }));
        this.dataSource.data = data; 
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
    this.dataSource.paginator = this.paginator;
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
  
    applyFilter(event: any) {
      this.dataSource.filter = event.target.value.trim().toLowerCase();
    }

    handlePeriods(emittedPeriods: any) {
      if (Array.isArray(emittedPeriods) && emittedPeriods.length > 0) {
        this.dataSource.data = emittedPeriods; // Asignar datos a la tabla
        this.isFormVisible = false; // Ocultar el formulario
      } else {
        console.warn('No se recibieron períodos válidos:', emittedPeriods);
      }
    }
    redirectByPeriod(periodId:number){
      this.router.navigateByUrl(`app/period/${periodId}`)
    }
    
    closeAddPeriod(event:any){
      this.showAddPeriod  = event;
    }
}
