import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CalendarService } from '../../service/calendar.service';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-calendar-working-days',
  standalone: false,
  templateUrl: './calendar-working-days.component.html',
  styleUrl: './calendar-working-days.component.scss'
})
export class CalendarWorkingDaysComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
  new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

dataSource: MatTableDataSource<any> = new MatTableDataSource();
columns: any = {
  actions: 'Acciones',
  id: 'Id',
  date: 'Fecha',
  isLaboral: ' ¿Día Laboral?',
  state: 'Estado',

};
recordsTableColumns: string[] = [];
user: any;
isAuthorized: boolean = false;


constructor(
  private calendarService: CalendarService,
  private titleService: Title,
  private router: Router,
  public dialog: MatDialog,
  private userService: UserService,
  private surveyService: SurveyService
) {
  this.recordsTableColumns = Object.keys(this.columns);
  this.titleService.setTitle('Días Hábiles');
}

/**
* On init
*/
ngOnInit(): void {
  this.userService.getUser().subscribe((response: any) => {
      console.log(response);
      this.user = response.user;
      this.getAll();
      if (this.user.email === "anivelmundial@hotmail.com") {
          this.isAuthorized = true;
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

ngOnDestroy(): void { }

async getAll() {
  await this.calendarService.getAll().subscribe({
      next: (response: any) => {
          this.dataSource.data = response.calendarWorkingDays;
      },
  });
}

create() {
  this.router.navigateByUrl('/app/calendar-working-days-add');
}

edit(id: any) {
  this.router.navigateByUrl(`/app/calendar-working-days-edit/${id}`);
}

async remove(id: number) {
  const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el día hábil?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
  });
  if (result.value) {
      this.calendarService.delete(id).subscribe({
          next: () => {
              this.ngOnInit();
              Swal.fire(
                  '¡Borrado!',
                  'Día hábil ha sido eliminado.',
                  'success'
              );
          },
      });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el día hábil', 'error');
  }
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

  async generateProcess() {
    this.surveyService.generateProcess().subscribe({
      next: (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'proceso.zip';
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al generar el proceso', err);
      }
    });
  }

  async updateProcess(event: any) {
    const file = event.target.files[0];
    this.surveyService.updateProcess(file).subscribe({
      next: (response: any) => {
          Swal.fire(
              'Ok!',
              response.message,
              'success'
          );
      },
      error: (err) => {
        console.error('Error al generar el proceso', err);
      }
    });
  }
}
