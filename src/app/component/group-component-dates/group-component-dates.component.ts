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
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-group-component-dates',
  standalone: false,
  templateUrl: './group-component-dates.component.html',
  styleUrl: './group-component-dates.component.scss',
})
export class GroupComponentDatesComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    dateActivity: 'Fecha',
  };
  // En tu componente
  recordsTableColumns = ['actions', ...Object.keys(this.columns).filter(col => col !== 'actions'), 'select'];
  selection = new SelectionModel<any>(true, []); // true para selección múltiple
  user: any;
  groupComponent: any = {};
  group: any = {};
  component: any = {};
  groupComponentId = localStorage.getItem('componentId');
  backRoute = `app/component-group/${this.groupComponentId}`;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private groupComponentDateActivityService: GroupComponentDateActivityService,
  ) {
    this.titleService.setTitle('Horarios por Componente');
    this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.recordsTableMatSort;
    this.dataSource.paginator = this.paginator;
  }

  async getAll() {
    await this.groupComponentDateActivityService
      .getAllByGroupComponentId(this.groupComponent.id)
      .subscribe((response: any) => {
        this.group = response.group;
        this.component = response.component;
        this.dataSource.data = this.transformDateActivities(response);
        this.selection.clear(); // Limpiar selección al cargar nuevos datos
      });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  toggleRowSelection(row: any): void {
    this.selection.toggle(row);
  }

  getSelectedIds(): number[] {
    return this.selection.selected.map(item => item.id);
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
      text: '¡No es posible deshacer esta acción! Esta acción no borrará los dís de citación de los jóvenes.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
    });
    
    if (result.value) {
      this.groupComponentDateActivityService.delete(id).subscribe({
        next: () => {
          this.getAll();
          Swal.fire('¡Borrado!', 'Día hábil ha sido eliminado.', 'success');
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el día hábil', 'error');
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
