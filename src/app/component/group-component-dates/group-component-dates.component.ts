import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CalendarService } from '../../service/calendar.service';
import { GroupComponentDateActivityService } from '../../service/group-component-date-activity.service';

@Component({
  selector: 'app-group-component-dates',
  standalone: false,
  templateUrl: './group-component-dates.component.html',
  styleUrl: './group-component-dates.component.scss',
})
export class GroupComponentDatesComponent {

  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    dateActivity: 'Fecha',
  };
  recordsTableColumns: string[] = [];
  user: any;
  groupComponent: any = {};
  group: any = {};
  component: any = {};
  groupComponentId = localStorage.getItem('componentId')
  backRoute = `app/component-group/${this.groupComponentId}`

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private groupComponentDateActivityService: GroupComponentDateActivityService,
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Horarios por Componente');
    this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.getAll()
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {}

  async getAll() {
    await this.groupComponentDateActivityService
      .getAllByGroupComponentId(this.groupComponent.id)
      .subscribe( (response: any) => {
        this.group = response.group;
        this.component = response.component;
        this.dataSource.data = this.transformDateActivities(response);
      });
  }

  transformDateActivities(data: any) {
    const daysOfWeek = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

    return data.groupComponentDateActivities.map((activity: any) => {
        const date = new Date(activity.dateActivity + "T00:00:00Z");
        const day = daysOfWeek[date.getUTCDay()];
        const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
        return {
            ...activity,
            dateActivity: `${activity.dateActivity} - ${formattedDay}`
        };
    });
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
      this.groupComponentDateActivityService.delete(id).subscribe({
        next: () => {
          this.ngOnInit();
          this.getAll();
          Swal.fire('¡Borrado!', 'Día hábil ha sido eliminado.', 'success');
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

}
