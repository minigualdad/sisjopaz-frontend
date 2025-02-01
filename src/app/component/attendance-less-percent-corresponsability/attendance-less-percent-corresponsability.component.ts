import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiaryService } from '../../service/beneficiary.service';

@Component({
  selector: 'app-attendance-less-percent-corresponsability',
  standalone: false,
  templateUrl: './attendance-less-percent-corresponsability.component.html',
  styleUrl: './attendance-less-percent-corresponsability.component.scss'
})
export class AttendanceLessPercentCorresponsabilityComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  id: 'Id',
  group: 'Grupo',
  name: 'Nombre',
  identificationType: 'Tipo de Identificación',
  identification: 'Identificación',
};
recordsTableColumns: string[] = [];
user: any;

constructor(
  private beneficiaryService: BeneficiaryService,
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
  await this.beneficiaryService.getAll().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.beneficiaries;
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

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
