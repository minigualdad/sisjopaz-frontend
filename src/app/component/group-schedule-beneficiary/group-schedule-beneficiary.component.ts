import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { GroupScheduleBeneficiaryService } from '../../service/group-schedule-beneficiary.service';
import { GroupScheduleService } from '../../service/group-schedule.service';

@Component({
    selector: 'app-group-schedule-beneficiary',
    templateUrl: './group-schedule-beneficiary.component.html',
    styleUrl: './group-schedule-beneficiary.component.scss',
    standalone: false
})
export class GroupScheduleBeneficiaryComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  // actions: 'Acciones',
  id: 'Id',
  dateSchedule: 'Fecha Horario',
  timeSchedule: 'Hora',
  date: 'Fecha Revisión',
  time: 'hora Revisión',
  dateTimeAssistanceSplitted: 'Fecha Asistencia',
  state: 'Estado',
};
recordsTableColumns: string[] = [];
user: any;
groupSchedule: any;


constructor(
  private groupScheduleService: GroupScheduleService,
  private groupScheduleBeneficiaryService: GroupScheduleBeneficiaryService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  private userService: UserService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Asistencias');
  this.groupSchedule = {};
  this.groupSchedule.id = this.activatedRoute.snapshot.paramMap.get('id');
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


async getGroup(){
  this.groupScheduleService.show(this.groupSchedule.id)
  .subscribe((response: any) => {
    this.groupSchedule = response.groupSchedule;
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

ngOnDestroy(): void { }

async getAll() {
  await this.groupScheduleBeneficiaryService.getAllByGroupSchedule(this.groupSchedule.id).subscribe({
      next: (response: any) => {
          this.dataSource.data = response.groupSchedules;
          this.getGroup();
      },
  });
}

create() {
  this.router.navigateByUrl(`/app/group-schedule-beneficiary-add/${this.groupSchedule.id}`);
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
