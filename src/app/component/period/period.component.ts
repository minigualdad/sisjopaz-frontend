import { Component, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupCycleService } from '../../service/group-cycle.service';

@Component({
  selector: 'app-period',
  standalone: false,
  templateUrl: './period.component.html',
  styleUrl: './period.component.scss'
})
export class PeriodComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

showAddPeriod = false;

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  year: 'Año',
  month: 'Mes',

};
recordsTableColumns: string[] = [];
periods: any;
isFormVisible = true;

constructor(
  private beneficiaryService: BeneficiaryService,
  private route: ActivatedRoute,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,private _groupCycleService: GroupCycleService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Periodos');
}

/**
* On init
*/
ngOnInit(): void {
  const periodId = Number(this.route.snapshot.paramMap.get('id'));
 this._groupCycleService.getPeriodsByGroupId(periodId).subscribe({
  next: (response:any) => {
    const period = response.groupCycle.map((item: { period: any }) => item.period);
    this.dataSource.data = period;
  }
 })
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

  closeAddPeriod(event:any){
    this.showAddPeriod  = event;
  }
}
